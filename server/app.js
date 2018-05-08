// 后端nodejs的入口文件
const express = require('express')

//  express中间件，作用是对post请求的请求体进行解析
const bodyParser = require('body-parser')
const userRoutes = require('./api/user')
const imageRoutes = require('./api/image')
const employeeRoutes = require('./api/employee')

// 在单页应用中，处理当刷新页面或直接在地址栏访问非根页面的时候，
// 返回404的bug。匹配非文件（路径中不带.）的get请求。Cli中已经有 无需安装
const history = require('connect-history-api-fallback')
const mongoose = require('mongoose')
const env = process.env.NODE_ENV || 'development'

// connect db 开发模式下
if (env === 'development') {
    // dbUrl = 'mongodb://localhost:27017/vnpastime'
  dbUrl = 'mongodb://localhost:27017/ztyrms'
}

mongoose.connect(dbUrl,function (err) {
  if(err){
    console.warn('数据库连接失败：'+err);
  }else {
    console.log('数据库成功连接到：'+dbUrl);
  }
})
mongoose.Promise = global.Promise

const app = express()

// 如果没有使用webpack代理 可以使用服务端连接权限控制 来处理跨域请求
// app.all('*',(req, res, next) => {  // 用get 可能只有get请求有用
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,OPTIONS')
//   next()
//   })


// 使用bodyParser.json() 解析json格式的请求体
// 请求 4000/user/* 的请求 都会匹配到
app.use(bodyParser.json())
// app.use('/api', userRoutes)
app.use('/user', userRoutes)
app.use('/employee', employeeRoutes)

app.use(history())

// 使用内置中间件 将`webpack`打包后的`dist`作为静态资源
if (env !== 'development') {
  app.use(express.static('./dist'))
}

// 错误处理 中间件
app.use((err, req, res, next) => {
    res.status(442).send({ error: err.message })
  })

// 监听4000端口
const server = app.listen(4000, () => {
console.log(`Express started in ${app.get('env')} mode on http://localhost:4000`)
})
