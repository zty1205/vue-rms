// 验证token的中间件
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  // 支持三种发送token的方式，请求头信息、表单、查询参数
  if (req.method !== 'POST') { // post请求才需要验证权限
    next()
  } else {
    // 检查post的信息或者url查询参数或者头信息
    const token = req.headers.accesstoken || req.body.token || req.query.token
    // 解析 token
    if (token) {
      // 验证token
      // 使用了回调函数 所以为异步操作
      // 第二个参数 secretOrPublicKey是一个字符串或缓冲区，包含HMAC算法的密钥或RSA和ECDSA的PEM编码公钥。
      jwt.verify(token, 'vnpastime', (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'token验证失败'
          })
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else { // token 不存在
      res.json({
        success: false,
        message: 'No token provided'
      })
    }
  }
}
// 这个很容易解释，只要参数有token或者头信息里有x-access-token，我们就认定它是一个api接口，
// 校验通过了，就把token的decode对象，也就是之前加密的用户对象返回来
