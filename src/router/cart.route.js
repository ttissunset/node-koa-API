const Router = require('koa-router')
const router = new Router({ prefix: '/carts' })

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')

// 获取购物车接口
router.post('/', auth, validator,(ctx)=>{ ctx.body = ctx.state.user})

module.exports = router
