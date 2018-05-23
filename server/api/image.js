const express = require('express')
const router = express.Router()
const Image = require('../models/image')

const multer = require('multer');//上传功能的插件
const path = require('path');
const fs = require('fs');

router.get('/list', (req, res, next) => {
  const num = req.query.count * 20
  Image.find({}).sort({'collections_count': -1}).limit(num).then(images => {
    res.send(images)
  }).catch(next)
})
// 获取网页上路由的信息 得到这个id 并去数据库中查找 然后发回去
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Image.findById({_id: id}).then(image => {
    res.send(image)
  })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    //文件上传成功后会放入public下的upload文件夹
    cb(null,  './server/public/')
  },
  filename: function (req, file, cb){
    //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
    cb(null, file.originalname)
  }
});
let upload = multer({
  storage: storage
});

router.post('/add',upload.single('file'), (req, res, next) => {
  console.log(req.file)
  let url = 'http://' + req.headers.host + '/upload/' + req.file.originalname;
  res.json({
    code : 1,
    data : url
  });
  res.end();
  return next
})


module.exports = router
