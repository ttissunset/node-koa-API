const Address = require('../model/addr.model')

class AddrService {
  async createAddr(addr) {
    return await Address.create(addr)
  }

  async findAllAddr(user_id) {
    return await Address.findAll({
      attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
      where: {
        user_id,
      },
    })
  }

  async updateAddr(id, addr) {
    return Address.update(addr, { where: { id } })
  }

  async removeAddr(id) {
    return await Address.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })
  }
}

module.exports = new AddrService()
