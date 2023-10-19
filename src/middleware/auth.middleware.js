const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const { tokenExpiredError, invalidToken,hasNotAdminPermission } = require('../constant/error.type')

// 用户认证 --> 判断是否登录并且token是否有效
const auth = async (ctx, next) => {
  try {
    const { authorization } = ctx.request.header
    // console.log(authorization)
    const token = authorization.replace('Bearer ', '')
    // console.log('token:' + token)
    // user 包含 payload 的信息
    //  jwt.verify(要检测的token, token加密私钥) --> 用于检测token是否匹配
    const user = jwt.verify(token, JWT_SECRET)
    // 将登录成功的用户信息挂载到 ctx.state.user 下
    ctx.state.user = user
    // console.log(ctx.state.user);
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }
  await next()
}

// 判断是否有管理员权限
const hasAdminPermission = async (ctx, next) => {
  // 判断是否为管理员
  const { is_admin } = ctx.state.user
  if(!is_admin){
    console.error('该用户无管理员权限!!',ctx.state.user);
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }
  await next()
}

module.exports = {
  auth,
  hasAdminPermission
}
