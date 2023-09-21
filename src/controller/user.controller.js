// 导入操作数据库的方法
const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/error.type')

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
    ctx.body = '登录用户'
  }
}

module.exports = new userController()
