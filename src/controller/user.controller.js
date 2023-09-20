// 导入操作数据库的方法
const { createUser } = require('../service/user.service')

class userController {
  async register(ctx, next) {
    // 获取数据
    // console.log(ct.request.body);
    const { user_name, password } = ctx.request.body
    // 操作数据库
    const res = await createUser(user_name, password)
    console.log(res);
    // 向客户端返回结果
    ctx.body = ctx.request.body
  }

  async login(ctx, next) {
    ctx.body = '登录用户'
  }
}

module.exports = new userController()
