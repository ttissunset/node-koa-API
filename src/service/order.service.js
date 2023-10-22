const Order = require('../model/order.model')

class orderSerice {
  async createOrder(order) {
    return await Order.create(order)
  }

  async findOrders(pageNum, pageSize, status) {
    const { count, rows } = await Order.findAndCountAll({
      attributes:['goods_info','total','order_number','status'],
      where: {
        status,
      },
      offset: (pageNum - 1) * pageSize,
      limit: pageSize * 1,
    })

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }
}

module.exports = new orderSerice()
