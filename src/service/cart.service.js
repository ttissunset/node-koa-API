const Cart = require('../model/cart.model')
const { Op } = require('sequelize')
const Goods = require('../model/goods.model')

class cartService {
  async createOrUpdate(user_id, goods_id) {
    // 根据goods_id和user_id同时查找
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          user_id,
          goods_id,
        },
      },
    })
    if (res) {
      // res 不为空表示存在一条数据 --> 通过sequelize的increment方法为 number字段加1
      // (如果要增加的数量为1 那么 {by: 1}可以省略)
      await res.increment('number', { by: 1 })
      // sequelize的reload()方法用于更新数据表
      return await res.reload()
    } else {
      // 如果没有查询到数据 那么向数据表中创建该记录
      return await Cart.create({
        user_id,
        goods_id,
      })
    }
  }

  async findCarts(pageNum, pageSize) {
    // offest 表示当前页之前页面的总记录数
    // limit 为请求的数量
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Cart.findAndCountAll({
      // 通过 attributes 指定要查找的字段
      attributes: ['id', 'number', 'selected'],
      offset: offset,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: 'goods_info',
        // 指定要查找的字段
        attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
      },
    })

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows,
    }
  }

  async updateCarts(params) {
    const { id, number, selected } = params
    const res = await Cart.findByPk(id)
    if (!res) {
      return ''
    }

    // 判断是否有传入以下两个参数 ，如果没有传入则不操作
    number !== undefined ? (res.number = number) : ''
    selected !== undefined ? (res.selected = selected) : ''

    return await res.save()
  }

  async removeCarts(ids) {
    return await Cart.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })
  }

  async selectAllCarts(user_id) {
    return await Cart.update(
      { selected: true },
      {
        where: {
          user_id,
        },
      }
    )
  }

  async unSelectAllCarts(user_id) {
    return await Cart.update(
      { selected: false },
      {
        where: {
          user_id,
        },
      }
    )
  }
}

module.exports = new cartService()
