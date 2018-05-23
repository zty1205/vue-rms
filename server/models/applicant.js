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
  applicantName : String,
  applicant_reason : String,
  auditorId : String,  // 审批人
  auditorName : String,
  auditor_reason : String,
  status : [Number, String]
})

const applicant = mongoose.model('applicant', applicantSchema)

module.exports = applicant
