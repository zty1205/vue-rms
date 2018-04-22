const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 企业员工 MongoDB Schema模型
const EmployeeSchema = new Schema({
    id: {
        type: String,
        required: [true, 'Name fields is required'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Name fields is required'],
    },
    password: String,
    image_url: String, // 图片路径
    gender: String, //性别
    age: Number,
    role: String, // 职位
    department: { // 部门
        type: String,
        required: true,
    },
    arrive_in: { // 入职时间
        type: Date,
        required: true,
        default: Date.now()
    },
    authority: Number, //权限
    attendance: Array, // 考勤表
    wages: Array, // 工资表
})

const Employee = mongoose.model('Employee', EmployeeSchema)

module.exports = Employee
