const fs = require('fs')

const Router = require('koa-router')
const router = new Router()

// 通过 fs 模块读取当前目录下的所有文件
fs.readdirSync(__dirname).forEach(file => {
  // 排除掉当前文件
  if(file !== 'index.js'){
    // 导入所有的路由模块
    let r = require('./' + file)
    // 通过 router.use() 注册所有路由
    router.use(r.routes())
  }
})

module.exports = router

