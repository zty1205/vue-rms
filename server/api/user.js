"use strict"

const express = require('express')
const router = express.Router()
const user = require('../models/user')

//
/** 服务端 登录用户信息api 接受axios请求 对MongoDB数据库进行操作  并返回数据
 *
 */

router.post('/login',(req,res,next)=>{
  // 这样查 查不到的对象 会因为数据结构不一致  而返回第一个对象
  const loginUser = {
    uid: req.body.uid,
    password: req.body.password
  }
  console.log(req.body)
  user.findOne(loginUser).then(user => {
    console.log('find mongodb' + user)
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

module.exports = router
