const express = require('express')
const router = express.Router()
const department = require('../models/department')

router.get('/test', (req, res, next) => {   // 路由为 4000/department/test
  console.log('in back test')
  res.send('hello test')
})

// 获取部门列表 http://localhost:4000/department/list
router.get('/list', (req, res, next) => {
  console.log('in list')
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




module.exports = router
