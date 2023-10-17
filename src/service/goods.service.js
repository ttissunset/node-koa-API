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
}

module.exports = new goodsService()
