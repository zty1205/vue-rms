const express = require('express')
const router = express.Router()
const department = require('../models/department')

router.get('/test', (req, res, next) => {   // 路由为 4000/department/test
  console.log('in back test')
  res.send('hello test')
})

// 获取部门列表 http://localhost:4000/department/list
router.get('/list', (req, res, next) => {
  // console.log('in list')
  department.find({}).then(departments => {
    // console.log(departments)
    if(departments){
      res.json({
        success: true,
        list: departments
      })
    }else {
      res.json({
        success: false
      })
    }
  })
})

// http://localhost:4000/department/get?did=0001
// 根据did 获取子部门
router.get('/get', (req, res, next) => {
  let did = req.query.did
  // console.log(did)
  department.find({parent_id: did}).then(departments => {
    // console.log(departments)
    if(departments && departments.length != 0){
      res.json({
        success: true,
        list: departments
      })
    }else {
      res.json({
        success: false,
        msg: '数据库查询错误'
      })
    }
  })
})

// 根据父部门的id 给新添加的部门设置did
function getDid(id, count,range) {
  let did = ''
  if(range == 1){
    // 添加的是一级部门
    let number = count * 1000
    return did + number
  }else {
    // 添加的是二级部门
    let number = parseInt(id) + count
    return did + number
  }
}

// http://localhost:4000/department/add?did=0001&name=zty&range=1
// http://localhost:4000/department/add?did=5000&name=zty&range=2
// 根据did 添加子部门
router.post('/add', (req, res, next) => {
  let info = req.body
  // console.log(info)
  if(info){
    let parent_id = info.parent_id
    let name = info.name
    let range = info.range
    // console.log(did)

    department.count({parent_id: parent_id},(error,count)=>{
      console.log(count)
      if(!error){
        // 新部门的id = 父级id + NO
        let newDepartment = {
          did: getDid(parent_id,count+1,range),
          parent_id: parent_id,
          NO:  count + 1,
          range: range,
          name: name
        }
        department.create(newDepartment, function (err, departments) {
          // console.log(departments)
          if(departments && departments.length != 0){
            res.json({
              success: true,
              list: departments
            })
          }else {
            res.json({
              success: false,
              msg: '数据库添加错误'
            })
          }
          return next
        })
      }else {
        console.log(error)
        res.send(error)
      }
    })
  }else {
    console.log('后台没接受到数据')
    res.send('后台没接受到数据')
  }

})

module.exports = router
