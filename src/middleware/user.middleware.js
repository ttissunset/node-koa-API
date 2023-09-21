const { getUserinfo } = require('../service/user.service')
const {
  userFormatError,
  userAlreadyExisted,
  user,
  userRegisterError,
} = require('../constant/error.type.js')
// 检测数据合法性 --> 判断明码或用户名是否为空
const userValidate = async (ctx, next) => {
  // 从body中解构处需要用到的数据
  const { user_name, password } = ctx.request.body
  if (!user_name || !password) {
    console.error('用户名或密码为空！！', ctx.request.body)
    ctx.app.emit('error', userFormatError, ctx)
    return
  }
  await next()
}

// 检测数据合理性 --> 判断数据库中是否有该用户
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  //! 如果不加await， getUserinfo({ user_name })的值恒为true
  // if (await getUserinfo({ user_name })) {
  //   ctx.app.emit('error', userAlreadyExisted, ctx)
  //   return
  // }
  try {
    const res = await getUserinfo({ user_name })
    if (res) {
      console.error('用户名已存在', { user_name })
      ctx.app.emit('error', userAlreadyExisted, ctx)
      return
    }
  } catch (err) {
    console.error('获取用户信息失败', err)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  await next()
}

module.exports = {
  userValidate,
  verifyUser,
}
