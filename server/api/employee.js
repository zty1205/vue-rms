const express = require('express')
const router = express.Router()
const employee = require('../models/employee')

// 测试路由 可在网页或axios请求中使用
router.get('/test', (req, res, next) => {   // 路由为 4000/employee/test
  console.log('in back test')
  res.send('hello test')
})

// 获取完整的表格以及分页控制
router.get('/list', (req, res, next) => {   // 路由为 4000/employee/list
  console.log('in back router')
  // 默认显示前10条
  let pageString = req.query.page || 0
  let page = parseInt(pageString)
  let sizeString = req.query.size || 10
  let size = parseInt(sizeString)
  // let count = 0
  // 这样子稍微好一点 但每次分页仍需查一次总数 应不应该单独拿出来 只允许刚开始的一次
  // 删除后 进行获取 应该保留下来
  employee.count({},(err,count)=>{
    employee.find({}).limit(size).skip(page * size).then(employee => {
      // console.log(employee)
      // res.send(employee)
      // console.log('ok')
      // console.log(count)
      res.json({
        count: count,
        list: employee
      })
      // console.log(res)
    }).catch(next)
  })
  // 两次数据库操作了 要不就查全部 然后把需要的数据填入一个新的array下 再返回
  // employee.find({}).then(employee=> {
  //   count = employee.length
  // })
  // employee.find({}).limit(size).skip(page * size).then(employee => {
  //   // console.log(employee)
  //   // res.send(employee)
  //   console.log('ok')
  //   console.log(count)
  //   res.json({
  //     count: count,
  //     list: employee
  //   })
  //   // console.log(res)
  // }).catch(next)
})

// 根据id删除   router.get 或post 不能写其他的
  // findById 查询的是ObjectID
// url 4000/employee/delete/123
router.get('/delete/:eid',(req,res,next) => {
  const eid = req.params.eid;
  employee.findOneAndRemove({eid: eid}).then((employee) =>{
    // 返回的是删除的employee的信息
    // 找不到的话 前端304 后台null
    if(!employee){
      // 有返回前端就是200
      res.json({
        isDelete: false,
        msg: '该员工不存在！'
      })
    }else{
      // console.log(employee)
      res.json({
        isDelete: true,
        msg: '员工奔现了远方！'
      })
    }
  }).catch(next)
})

// 添加 如果找不到数据库id自增长 就让前端代替
// 测试添加  测试 req.params 实际应用res.body 前端传json格式
// url 4000/employee/add?eid=1001&name=zty  这里写的参数是包含在query中的 而不是param
router.post('/add',(req,res,next) => {
  console.log('in router')
  // console.log(req)
  //console.log(req.params)// {} 空对象
  // console.log(req.query)
  const eid = req.body.eid;  // post 直接传vue里的json对象 后台就是在body中取数据
  const name = req.body.name;
  employee.create({
    eid: eid,  // 数据可以保存进去
    name: name,
    age: '6',
    role: 'test'
  },function(err,doc){
      console.log(doc)  // doc  返回的是存储后的信息
      res.send(doc)
    return next   // 添加后才不会报错
  })
})

// url 4000/employee/find?eid=1001&name=zty&department=1
router.get('/find',(req,res,next) => {
  const eid = req.query.eid;
  const name = req.query.name;
  const department = req.query.department
  let em = {}
  if(eid){
    em.eid = eid
  }
  if(name){
    em.name = name
  }
  if(department){
    em.department = department
  }
  console.log(em)  // 返回的长度 由前端判断好了
  employee.find(em).then(employee =>{
    console.log(employee)
    if (!employee || employee.length ==0){
      res.json({
        isExist: false,
        list: null
      })
    }else{
      res.json({
        isExist:true,
        list: employee
      })
    }
  })
})

// url http://localhost:4000/employee/changeStatus?eid=YF000001&status=2
router.post('/changeStatus',(req,res,next) => {
  const eid = req.body.eid;
  const status = req.body.status;
// 第一参数是查询条件 第二个函数是更新的数据 第三个是配置 如果new不为true则返回更新前的数据
  // 获取的数据 前端可使用对象替换
  employee.findOneAndUpdate({eid: eid},{status: status},{new: true}).then(employee =>{
    // console.log(employee)
    if (!employee || employee.length ==0){
      res.json({
        isExist: false,
        list: null
      })
    }else{
      res.json({
        isExist:true,
        list: employee
      })
    }
  })
})

module.exports = router
