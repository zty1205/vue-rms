const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  uid: {
    type: String,
    required: [true, 'Name fields is required'],
    unique: true
  },
  name: String,
  email: String,
  password: String,
  authorization: Number,
  avatar_url: String, // 头像
  role: String // 职位
})

const User = mongoose.model('user', UserSchema)
module.exports = User
