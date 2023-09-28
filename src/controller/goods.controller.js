class GoodsController {
  async upload(ctx, next) {
    ctx.body = '文件上传成功！！'
  }
}

module.exports = new GoodsController()
