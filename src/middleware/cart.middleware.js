const { invalidgoodsId } = require('../constant/error.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_id: { type: 'number', required: true },
    })
  } catch (err) {
    console.error(err)
    invalidgoodsId.result = err.message
    return ctx.app.emit('error', invalidgoodsId, ctx)
  }
  await next()
}

module.exports = {
  validator,
}
