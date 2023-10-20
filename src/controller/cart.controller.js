const {
  createOrUpdate,
  findCarts,
  updateCarts,
  removeCarts,
  selectAllCarts,
  unSelectAllCarts
} = require('../service/cart.service')
const { cartFormatError } = require('../constant/error.type')

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

  // 更新购物车
  async update(ctx) {
    // 解析请求参数
    const { id } = ctx.request.params
    const { number, selected } = ctx.request.body
    if (number === undefined && selected === undefined) {
      cartFormatError.message = 'number和selected不能同时为空！！'
      ctx.app.emit('error', cartFormatError, ctx)
    }

    const res = await updateCarts({ id, number, selected })
    ctx.body = {
      code: 200,
      message: '更新购物车成功！！',
      result: res,
    }
  }

  // 删除购物车
  async remove(ctx) {
    const { ids } = ctx.request.body

    const res = await removeCarts(ids)

    ctx.body = {
      code: 200,
      message: '删除购物车成功！！',
      result: res,
    }
  }

  // 全选
  async selectAll(ctx) {
    const  user_id  = ctx.state.user.id

    const res = await selectAllCarts(user_id)

    ctx.body = {
      code: 200,
      message: '全选购物车成功！！',
      data: res,
    }
  }

  // 全不选
  async unSelectAll(ctx) {
    const  user_id  = ctx.state.user.id

    const res = await unSelectAllCarts(user_id)

    ctx.body = {
      code: 200,
      message: '全不选购物车成功！！',
      data: res,
    }
  }
}

module.exports = new cartController()
