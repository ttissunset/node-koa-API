const { createOrder,findOrders } = require('../service/order.service')

class orderController {
  async create(ctx) {
    const user_id = ctx.state.user.id
    const { address_id, goods_info, total } = ctx.request.body

    // 生成唯一的订单编号
    const order_number = 'coisini' + Date.now()

    const res = await createOrder({
      order_number,
      user_id,
      address_id,
      goods_info,
      total,
    })

    ctx.body = {
      code: 0,
      message: '创建订单成功',
      result: res,
    }
  }

  async findAll(ctx) {
    const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query

    const res = await findOrders(pageNum, pageSize, status)

    ctx.body = {
      code: 0,
      message: '查询成功',
      result: res,
    }
  }
}

module.exports = new orderController()
