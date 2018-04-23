const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 企业员工 MongoDB Schema模型
const employeeSchema = new Schema({
    id: String,
    name: String,
    age: String,
    role: String
})  // 不能加 s  对应的是MongoDB里叫 employee 的 collection  , { collection: "employee" }

const employee = mongoose.model('employee', employeeSchema)   // 不能加 s  对应的是MongoDB里叫 employee 的 collection
// 有时候上面的行 有时候下面的行 有点奇怪 都试试
module.exports = employee
