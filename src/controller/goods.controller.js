const Path = require('path')

const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
} = require('../constant/error.type')

const { createGoods } = require('../service/goods.service')
class GoodsController {
  async upload(ctx, next) {
    // 从  ctx.request.files 中解构出 名称为 file 的文件
    const { file } = ctx.request.files
    console.log(file)
    // 指定文件上传类型为jpg/png
    const fileTypes = ['image/jpeg', 'image/png']
    // 判断是否有名称为 file 的文件
    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        // 如果文件类型不属于我们指定的文件类型，则抛出错误
        return ctx.app.emit('error', unSupportedFileType, ctx)
      }
      ctx.body = {
        code: 0,
        message: '文件上传成功！！',
        result: {
          goods_img: Path.basename(file.filepath),
        },
      }
    } else {
      // 如果没有则抛出错误
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }

  async create(ctx) {
    // 直接调用service的createGoods方法
    try {
      const res = await createGoods(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '发布成功！！',
        result: res,
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('err', publishGoodsError, ctx)
    }
  }
}

module.exports = new GoodsController()
