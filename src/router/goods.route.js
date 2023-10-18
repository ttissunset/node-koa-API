const Router = require('koa-router')

// 导入用户认证模块，判断用户是否登录
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
const { upload,create,update,remove,softRemove,restore,findAll } = require('../controller/goods.controller')

const router = new Router({ prefix: '/goods' })

// 登录后才有权限上传图片
router.post('/upload', auth,hasAdminPermission, upload)

// 发布商品接口
router.post('/', auth, hasAdminPermission, validator,create)

// 修改商品接口
router.put('/:id', auth, hasAdminPermission, validator,update)

// 删除商品接口(硬删除)
router.delete('/:id', auth, hasAdminPermission, remove)

// 下架商品接口
router.post('/:id/off',auth, hasAdminPermission, softRemove)


// 上架商品接口
router.post('/:id/on',auth, hasAdminPermission, restore)

// 获取商品列表接口
router.get('/', findAll)

module.exports = router
