const Router = require('koa-router')
const router = new Router({ prefix: '/address' })

// 中间件和控制器
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')
const { create } = require('../controller/addr.controller')

// 添加地址
router.post(
  '/',
  auth,
  validator({
    consignee: 'string',
    phone: {
      type: 'string',
      format: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9])|(198))\d{8}$/,
    },
    address: 'string',
  }),
  create
)

module.exports = router
