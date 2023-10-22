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
        id,
      },
    })
  }

  async setDefaultAddr(user_id, id) {
    // 先将该用户的所有地址设置为非默认地址
    await Address.update({is_default: false,},{where: {user_id}})
    // 再根据id将该用户的对应地址设置为默认地址
    return await Address.update({is_default: true,},{where: {id}})
  }
}

module.exports = new AddrService()
