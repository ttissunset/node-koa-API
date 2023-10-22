const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/order.middleware')
const { create,findAll } = require('../controller/order.controller')

const router = new Router({ prefix: '/orders' })

// 生成订单
router.post(
  '/',
  auth,
  validator({
    address_id: 'string',
    goods_info: 'string',
    total: 'string',
  }),
  create
)

// 获取订单列表
router.get('/', auth,findAll)

module.exports = router
