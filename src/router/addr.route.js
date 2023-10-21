const Router = require('koa-router')
const router = new Router({ prefix: '/address' })

// 中间件和控制器
const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')
const {
  create,
  findAll,
  update,
  remove,
} = require('../controller/addr.controller')

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

// 获取地址列表
router.get('/', auth, findAll)

// 更新地址
router.put(
  '/:id',
  auth,
  validator({
    consignee: 'string',
    phone: {
      type: 'string',
      format: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9])|(198))\d{8}$/,
    },
    address: 'string',
  }),
  update
)

// 删除地址
router.delete('/:id', auth, remove)

module.exports = router
