const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 请假审批 MongoDB Schema模型
const departmentSchema = new Schema({
  did: {
    type: String,
    required: true
  },
  parent_id: String,
  NO:  Number,
  range: Number,
  name: String
})

const department = mongoose.model('department', departmentSchema)

module.exports = department
