const { createAddr } = require('../service/addr.service')

class AddrController {
  async create(ctx) {
    // 获取用户ID
    const user_id = ctx.state.user.id
    // 获取参数
    const { address, phone, consignee } = ctx.request.body

    const res = await createAddr({ user_id, address, phone, consignee })

    ctx.body = {
      code: 0,
      data: res,
      message: '添加地址成功',
    }
  }
}

module.exports = new AddrController()
