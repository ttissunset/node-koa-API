// 导入操作数据库的方法
const { createUser, getUserinfo } = require('../service/user.service')

class userController {
  async register(ctx, next) {
    // 获取数据
    // console.log(ct.request.body);
    const { user_name, password } = ctx.request.body

    // 检测数据合法性 --> 判断明码或用户名是否为空
    if (!user_name || !password) {
      console.error('用户名或密码为空！！', ctx.request.body)
      ctx.status = 400
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空！！',
        result: '',
      }
      return
    }

    // 检测数据合理性 --> 判断数据库中是否有该用户
    if(getUserinfo({ user_name })){
      ctx.status = 409
      ctx.body = {
        code: '10002',
        message: '该用户已存在！！',
        result: '',
      }
      return
    }

    // 操作数据库
    const res = await createUser(user_name, password)

    console.log(res)
    // 向客户端返回结果
    ctx.body = {
      code: 0,
      msg: '用户注册成功',
      result: {
        id: res.id,
        user_name: res.user_name,
      },
    }
  }

  async login(ctx, next) {
    ctx.body = '登录用户'
  }
}

module.exports = new userController()
