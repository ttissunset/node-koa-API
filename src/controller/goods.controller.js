const Path = require('path')

const { fileUploadError } = require('../constant/error.type')
const { log } = require('console')

class GoodsController {
  async upload(ctx, next) {
    // 从  ctx.request.files 中解构出 名称为 file 的文件
    const { file } = ctx.request.files
    console.log(file);
    // 判断是否有名称为 file 的文件 
    if(file){
      ctx.body = {
        code:0,
        message:'文件上传成功！！',
        result:{
          goods_img:Path.basename(file.filepath)
        }
      }
    }else{
      // 如果没有则抛出错误
      return ctx.app.emit('error',fileUploadError,ctx)
    }
  }
}

module.exports = new GoodsController()
