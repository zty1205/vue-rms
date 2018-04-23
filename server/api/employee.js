const express = require('express')
const router = express.Router()
const employee = require('../models/employee')

router.get('/test', (req, res, next) => {   // 路由为 4000/employee/list
  console.log('in back test')
  res.send('hello test')
})

router.get('/list', (req, res, next) => {   // 路由为 4000/employee/list
  console.log('in back router')
  employee.find({}).then(employee => {
    console.log(employee)
    res.send(employee)
  })
})

module.exports = router
