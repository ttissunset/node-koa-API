const jwt = require('jsonwebtoken')

// 导入操作数据库的方法
const { createUser, getUserinfo } = require('../service/user.service')
const { userRegisterError } = require('../constant/error.type')

const { JWT_SECRET } = require('../config/config.default')

class userController {
  async register(ctx, next) {
    // 获取数据
    // console.log(ct.request.body);
    const { user_name, password } = ctx.request.body

    // try..catch 进行错误捕获
    try {
      // 操作数据库
      const res = await createUser(user_name, password)
      // console.log(res)
      // 向客户端返回结果
      ctx.body = {
        code: 0,
        msg: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    try {
      const { user_name } = ctx.request.body
      // 从数据库中解构出数据，并剔除password
      const { password, ...res } = await getUserinfo({ user_name })
      // 向客户端返回内容
      ctx.body = {
        code: 0,
        msg: '用户登录成功',
        result: {
          // 携带token jwt.sign(payload,secret,{ expiresIn: time }) --> payload 是要携带的参数对象，secret:是加密私钥，expiresIn是有效时间
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        },
      }
    } catch (err) {
      console.error('用户登录失败', err)
    }
  }
}

module.exports = new userController()
