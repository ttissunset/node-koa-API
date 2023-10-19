const Router = require('koa-router')
const router = new Router({ prefix: '/carts' })

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const { add,findAll } = require('../controller/cart.controller')

//添加购物车接口
router.post('/', auth, validator, add)

// 获取购物车列表
router.get('/', auth, findAll)

module.exports = router
