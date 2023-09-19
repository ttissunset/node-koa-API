const Router = require('koa-router')

const router = new Router({ prefix: '/users' })

// 获取处理 register 路由的函数
const { register,login } = require('../controller/user.controller')

router.get('/', (ctx, next) => {
  ctx.body = 'users'
})

// 将和注册相关的路由交给 register 函数进行单独处理
router.post('/register', register)
// 登录接口
router.post('/login',login)

module.exports = router
