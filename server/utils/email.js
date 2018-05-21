
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465, // SMTP 端口
  secureConnection: true, // 使用了 SSL
  auth: {
    user: '1160051490@qq.com',
    // 这里密码不是qq密码，是你设置的smtp授权码
    pass: 'wzlwejzavzanbaci',
  }
});

module.exports = transporter

