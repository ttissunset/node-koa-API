const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')

const { tokenExpiredError, invalidToken } = require('../constant/error.type')

const auth = async (ctx, next) => {
  try {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    console.log(token)
    // user 包含 payload 的信息
    //  jwt.verify(要检测的token, token加密私钥) --> 用于检测token是否匹配
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
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

module.exports = {
  auth,
}
