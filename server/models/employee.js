const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 企业员工 MongoDB Schema模型
const employeeSchema = new Schema({
  eid:{
    type: String,
    required: [true, 'Name fields is required'],
    unique: true
  },
  name: String,
  password: {
    type: String,
    required: [true, 'password fields is required'],
  },
  phone:  String,
  address: String,
  avatar: String, // 头像路径
  img: String,
  gender: String, //性别
  age: Number,
  role: Number, // 职位  roleMap = { 3: '总监', 2: '经理', 1：'组员' }
  department: { // 部门 departmentMap = {1: '研发部', 2: '业务部', 3: '后勤部', 4: '人事部'}
    type: Number,
    required: true,
  },
  subD: String, // 二级部门
  status: Number, // 状态 statusMap = {0: '离职', 1: '在职', 2: '休假', 3: '实习生'}
  arrive: { // 入职时间
    type: Date,
    required: true,
    default: Date.now()
  },
  leave:{
    type: Date,
    default: null  // null 表示未离职
  },
  authority: Number, //权限   2>1>0
})  // 不能加 s  对应的是MongoDB里叫 employee 的 collection  , { collection: "employee" }

const employee = mongoose.model('employee', employeeSchema)   // 不能加 s  对应的是MongoDB里叫 employee 的 collection
// 有时候上面的行 有时候下面的行 有点奇怪 都试试
module.exports = employee
