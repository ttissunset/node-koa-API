const Koa = require('koa')

const errHandler = require('./error.handle')

// 引入解析body参数的中间件并注册
const { koaBody } = require('koa-body')

const app = new Koa()

const userRouter = require('../router/user.route')

app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app
