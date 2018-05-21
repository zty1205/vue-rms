"use strict"

const express = require('express')
const router = express.Router()
const user = require('../models/user')
const transporter = require('../utils/email')
const crypto = require('crypto')

function mdPass(password) {
  let MD5 = crypto.createHash('md5')
  let pass = MD5.update(password).digest('hex')
  return pass.toUpperCase()
}
//
/** 服务端 登录用户信息api 接受axios请求 对MongoDB数据库进行操作  并返回数据
 *
 */

router.post('/login',(req,res,next)=>{
  // 这样查 查不到的对象 会因为数据结构不一致  而返回第一个对象
  let loginUser = req.body
  let password = req.body.password
  loginUser.password = mdPass(password)
  // console.log(req.body)
  user.findOne(loginUser).then(user => {
    // console.log('find mongodb' + user)
    if(user){
      res.json({
        success: true,
        msg: '登录成功',
        info: user
      })
      // res.send(user)
    }else {
      res.json({
        success: false,
        msg: '该用户不存在',
        info: null
      })
    }
    return next
  })
})

router.post('/register',(req,res,next)=>{
  // 这样查 查不到的对象 会因为数据结构不一致  而返回第一个对象
  // 如果注册了已存在的用户 就会报错 因为在model中限制了id的唯一性
  console.log(req.body)
  let AppUser = req.body.AUser
  let newUser = req.body.NUser
  let password = newUser.password
  newUser.password = mdPass(password)
  user.create(newUser,function (err,user) {
    if(!err){
      // console.log(user)
      res.json({
        success: true
      })
      // 邮箱操作
      // 2 配置
      let mailOptions = {
        from: "'张腾跃' <1160051490@qq.com>", // sender address
        to: 'zty1160051490@163.com', // list of receivers
        subject: 'Hello ' + user.name, // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: '<p>' + AppUser.name + '已为你添加了登录账户</p>' +
        '<p>账号是你的员工id， 密码是<strong>'+ password +'</strong></p>' // html body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      })
    }else {
      res.json({
        success: false
      })
    }
  })
  return next
})

module.exports = router
