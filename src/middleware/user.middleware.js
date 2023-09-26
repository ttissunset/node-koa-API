const bcrypt = require('bcryptjs')

const { getUserinfo } = require('../service/user.service')
const {
  userFormatError,
  userAlreadyExisted,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPassword,
} = require('../constant/error.type.js')
// 检测数据合法性 --> 判断密码或用户名是否为空
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

// 对密码进行加密
const cryptPassword = async (ctx, next) => {
  // 从 ctx 中获取密码
  const { password } = ctx.request.body
  // 设置加盐次数
  const salt = bcrypt.genSaltSync(10)
  // 对密码进行十次加盐，hash为加密后的密码
  const hash = bcrypt.hashSync(password, salt)
  // 将加密后的密码覆盖原密码
  ctx.request.body.password = hash
  await next()
}

// 检测登录用户名和密码是是否正确
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 1.判断用户是否存在
  try {
    const res = await getUserinfo({ user_name })
    // 如果查询不到该用户信息，抛出错误
    if (!res) {
      console.error('用户名不存在', userDoesNotExist)
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }

    // 2.判断密码是否匹配
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (error) {
    console.error('获取用户信息失败', error)
    return ctx.app.emit('error', userLoginError, ctx)
  }

  await next()
}

module.exports = {
  userValidate,
  verifyUser,
  cryptPassword,
  verifyLogin,
}
