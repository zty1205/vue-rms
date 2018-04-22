const express = require('express')
const router = express.Router()
const employee = require('../models/employee')

router.use('/employee/list', (req, res, next) => {
  const start = req.params.start
  const num = req.params.num
  console.log('in back router')
  employee.find({}).limit(num).then(employees => {
    res.send(employees)
  }).catch(next)
})

module.exports = router
