const express = require('express')
const router = express.Router()
const applicant = require('../models/applicant')

// 测试路由 可在网页或axios请求中使用
router.get('/test', (req, res, next) => {   // 路由为 http://localhost:4000/applicant/test
  console.log('in back test')
  res.send('hello test')
})

// 路由为 http://localhost:4000/applicant/apply?applicantId=YF000001  // 获取id为YF000001的所有申请表
router.get('/apply', (req, res, next) => {
  let aId = req.query.applicantId
  applicant.find({applicantId: aId}).then(applicant => {
    // console.log(applicant)
    if (applicant) {
      res.json({
        isExist: true,
        list: applicant
      })
    } else {
      res.json({
        isExist: false,
        list: null
      })
    }
    return next
  })
})


// 路由为 http://localhost:4000/applicant/audit?auditorId=100001  // 获取id为100001的所有审批表
router.get('/audit', (req, res, next) => {
  let aId = req.query.auditorId
  applicant.find({auditorId: aId}).then(applicant => {
    // console.log(applicant)
    if (applicant) {
      res.json({
        isExist: true,
        list: applicant
      })
    } else {
      res.json({
        isExist: false,
        list: null
      })
    }
    return next
  })
})

// http://localhost:4000/applicant/changeStatus?qid=000006&status="1"
router.post('/changeStatus',( req, res, next) => {
  let qid = req.body.qid
  let status = req.body.status
  applicant.findOneAndUpdate({qid: qid}, {status: status},{new: true}).then( applicant => {
    // console.log(applicant)
    if(applicant){
      res.json({
        success: true,
        list: applicant
      })
    }else {
      res.json({
        success: false,
        msg: '请假条修改失败'
      })
    }
    return next
  })
})

router.post('/add',( req, res, next) => {
  const newApplicant = req.body
  // console.log(newApplicant)
  // model如果没有相应的字段 是存储不进去的
  applicant.create(newApplicant,function(err, doc){
    console.log(doc)
    if(!err){
      res.json({
        success: true,
        list: doc
      })
    }else {
      console.log(err)
      res.json({
        success: false,
        msg: err
      })
    }
    return next
  })
})

// 暴露一个中间件 不写就是几个函数的文件  报错
module.exports = router
