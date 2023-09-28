const Koa = require('koa')

const errHandler = require('./error.handle')

// 引入解析body参数的中间件并注册
const { koaBody } = require('koa-body')

const app = new Koa()

const router = require('../router')

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app
