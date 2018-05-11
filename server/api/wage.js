const express = require('express')
const router = express.Router()
const wage = require('../models/wage')

// 测试路由 可在网页或axios请求中使用
router.get('/test', (req, res, next) => {   // 路由为 http://localhost:4000/wage/test
  console.log('in back test')
  res.send('hello test')
})

router.get('/find', (req, res, next) => {   // 路由为 http://localhost:4000/wage/find?eid=YF000001
  let eid = req.query.eid
  wage.find({}).then(wage => {
    console.log(wage)
    res.send(wage)
  }).catch(next)
})

module.exports = router
