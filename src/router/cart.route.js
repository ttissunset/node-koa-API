const Router = require('koa-router')
const router = new Router({ prefix: '/carts' })

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const {
  add,
  findAll,
  update,
  remove,
} = require('../controller/cart.controller')

//添加购物车接口
router.post('/', auth, validator({ goods_id: 'number' }), add)

// 获取购物车列表
router.get('/', auth, findAll)

// 更新购物车
router.patch(
  '/:id',
  auth,
  validator({
    number: { type: 'number', required: false },
    selected: { type: 'bool', required: false },
  }),
  update
)

// 删除购物车
router.delete('/', auth, validator({ ids: 'array' }), remove)

module.exports = router
