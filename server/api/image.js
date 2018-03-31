const express = require('express')
const router = express.Router()
const Image = require('../models/image')

router.get('/images', (req, res, next) => {
  const num = req.query.count * 20
  Image.find({}).sort({'collections_count': -1}).limit(num).then(images => {
    res.send(images)
  }).catch(next)
})
// 获取网页上路由的信息 得到这个id 并去数据库中查找 然后发回去
router.get('/images/:id', (req, res, next) => {
  const id = req.params.id
  Image.findById({_id: id}).then(image => {
    res.send(image)
  })
})

module.exports = router
