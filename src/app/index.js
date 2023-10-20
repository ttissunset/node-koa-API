const path = require('path')

const Koa = require('koa')

const errHandler = require('./error.handle')

// 引入解析body参数的中间件并注册
const{ koaBody} = require('koa-body')
const koaStaic = require('koa-static')
const parameter = require('koa-parameter')

const app = new Koa()

const router = require('../router')

app.use(
  koaBody({
    // multipart:是否开启文件上传 --> 默认为false
    multipart: true,
    formidable: {
      // 文件要保存的路径
      //! 在配置选项option中，应该避免使用相对路径 --> 因为在option中，相对的是 process.cwd() 而非当前文件
      uploadDir: path.join(__dirname, '../upload'),
      // 保留文件后缀名
      keepExtensions: true,
    },
    // 配置koa-body中间件，使以下方法的body参数可以挂载到ctx.request.body下
    parsedMethods:['POST','PUT','PATCH','DELETE']
  })
)
// 使用 koa-static 中间件将upload文件夹配置为静态资源
app.use(koaStaic(path.join(__dirname, '../upload')))

app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', errHandler)

module.exports = app
