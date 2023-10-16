const Router = require('koa-router')

// 导入用户认证模块，判断用户是否登录
const { auth, hasAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
const { upload,create } = require('../controller/goods.controller')

const router = new Router({ prefix: '/goods' })

// 登录后才有权限上传图片
router.post('/upload', auth,hasAdminPermission, upload)

// 发布商品接口
router.post('/', auth, hasAdminPermission, validator,create)

module.exports = router
