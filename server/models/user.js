const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name fields is required'],
    unique: true
  },
  password: {
    type: String
  },
  avatar_url: String, // 头像
  role: String // 职位
})

const User = mongoose.model('User', UserSchema)
module.exports = User
