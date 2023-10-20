const { cartFormatError } = require('../constant/error.type')

// 通过使用闭包 提高程序的复用
const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (err) {
      console.error(err)
      cartFormatError.result = err.message
      return ctx.app.emit('error', cartFormatError, ctx)
    }
    await next()
  }
}

module.exports = {
  validator,
}
