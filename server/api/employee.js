const express = require('express')
const router = express.Router()
const employee = require('../models/employee')

// 测试路由 可在网页或axios请求中使用
router.get('/test', (req, res, next) => {   // 路由为 4000/employee/test
  console.log('in back test')
  res.send('hello test')
})

router.get('/list', (req, res, next) => {   // 路由为 4000/employee/list
  console.log('in back router')
  employee.find({}).then(employee => {
    console.log(employee)
    res.send(employee)
  }).catch(next)
})

// 根据id删除   router.get 或post 不能写其他的
  // findById 查询的是ObjectID
// url 4000/employee/delete/eid
router.get('/delete/:eid',(req,res,next) => {
  const eid = req.params.eid;
  employee.findOneAndRemove({eid: eid}).then((employee) =>{
    // 返回的是删除的employee的信息
    // 找不到的话 前端304 后台null
    if(!employee){
      // 有返回前端就是200
      res.send('该用户不存在！')
    }else{
      console.log(employee)
      res.send(employee)
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

module.exports = router
