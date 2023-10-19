const { createOrUpdate, findCarts } = require('../service/cart.service')

class cartController {
  // 处理 将商品添加到购物车的 函数
  async add(ctx) {
    // 1.解析goods_id和user_id
    const user_id = ctx.state.user.id
    const goods_id = ctx.request.body.goods_id
    // 2.操作数据库
    // 如果是第一次添加则create, 如果非第一次添加则 updata
    const res = await createOrUpdate(user_id, goods_id)
    // 3.返回结果
    ctx.body = {
      code: 200,
      message: '添加购物车成功！！',
      data: res,
    }
  }

  // 获取购物车列表
  async findAll(ctx) {
    // 解析请求参数
    const { pageNum, pageSize } = ctx.request.query
    // 操作数据库
    const res = await findCarts(pageNum, pageSize)
    // 返回结果
    ctx.body = {
      code: 200,
      message: '获取购物车列表成功！！',
      result: res,
    }
  }
}

module.exports = new cartController()
