const Koa = require('koa')

// 引入解析body参数的中间件并注册
const { koaBody } = require('koa-body')

const app = new Koa()

const userRouter = require('../router/user.route')

app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

module.exports = app
