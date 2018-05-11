const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 请假审批 MongoDB Schema模型
const applicantSchema = new Schema({
  qid :  String,
  beginTime : {
    type: Date,
    required: true
  },
  endTime : {
    type: Date,
    required: true
  },
  applicantId : String,  // 申请人
  applicant_reason : String,
  auditorId : String,  // 审批人
  auditor_reason : String,
  status : Number  // 不通过 0 等待 1  通过 2
})

const applicant = mongoose.model('applicant', applicantSchema)

module.exports = applicant
