const { goodsFormatError } = require('../constant/error.type')

const validator = async (ctx, next) => {
  try {
    // koa-parameter 中间件提供的方法，用于对数据格式的校验
    ctx.verifyParams({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true },
    })
  } catch (err) {
    console.error(err)
    goodsFormatError.result = err.message
    return ctx.app.emit('error', goodsFormatError, ctx)
  }
  await next()
}

module.exports = {
  validator,
}
