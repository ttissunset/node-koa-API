const { orderFormatError } = require('../constant/error.type')

const validator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (err) {
      console.error(err)
      orderFormatError.result = err.message
      ctx.app.emit('error', orderFormatError, ctx)
    }
    await next()
  }
}

module.exports = {
  validator,
}
