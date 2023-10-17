const Path = require('path')

const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidgoodsId
} = require('../constant/error.type')

const { createGoods, upadetaGoods } = require('../service/goods.service')

class GoodsController {
  // 上传图片的路由处理中间件
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

  // 发布商品的路由处理中间件
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

  // 修改商品的路由处理中间件
  async update(ctx) {
    try {
      const res = await upadetaGoods(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改成功商品！！',
          result: '',
        }
      } else {
        return ctx.app.emit('error', invalidgoodsId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = new GoodsController()
