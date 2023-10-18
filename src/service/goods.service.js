// 导入 Goods 模型 --> 对应数据库的 goods表
const Goods = require('../model/goods.model')

class goodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods)
    return res.dataValues
  }

  async upadetaGoods(id, goods) {
    // 通过 id 查询对应的商品，并通过 goods 替代原有数据
    const res = await Goods.update(goods, { where: { id } })
    // 如果有更新成功，则至少返回一条数据
    return res[0] > 0 ? true : false
  }

  async removeGoods(id) {
    // 通过id删除数据表中的商品
    const res = await Goods.destroy({ where: { id } })
    return res > 0 ? true : false
  }

  async softRemoveGoods(id) {
    // 通过id下架数据表中的商品
    const res = await Goods.destroy({ where: { id } })
    return res > 0 ? true : false
  }

  async restoreGoods(id) {
    // 通过id上架数据表中的商品
    const res = await Goods.restore({ where: { id } })
    return res > 0 ? true : false
  }

  async findGoods(pageNum, pageSize) {
    // 1.获取总数
    // const count = await Goods.count()
    // 2.获取分页数据
    // const offset = (pageNum - 1) * pageSize
    // const rows = await Goods.findAll({
    //   offset: offset,
    //   limit: pageSize * 1,
    // })


    // 优化：将第一步和第二步进行合并操作
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Goods.findAndCountAll({
      offset: offset,
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

module.exports = new goodsService()
