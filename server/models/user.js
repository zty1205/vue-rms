const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  uid: String,
  password: String,
  authorization: Number,
  avatar_url: String, // 头像
  role: String // 职位
})

const User = mongoose.model('user', UserSchema)
module.exports = User
