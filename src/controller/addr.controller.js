const {
  createAddr,
  findAllAddr,
  updateAddr,
  removeAddr,
  setDefaultAddr,
} = require('../service/addr.service')

class AddrController {
  async create(ctx) {
    // 获取用户ID
    const user_id = ctx.state.user.id
    // 获取参数
    const { address, phone, consignee } = ctx.request.body

    const res = await createAddr({ user_id, address, phone, consignee })

    ctx.body = {
      code: 0,
      message: '添加地址成功',
      result: res,
    }
  }

  async findAll(ctx) {
    const user_id = ctx.state.user.id

    const res = await findAllAddr(user_id)

    ctx.body = {
      code: 0,
      message: '获取地址成功',
      result: res,
    }
  }

  async update(ctx) {
    // 获取用户ID
    const id = ctx.request.params.id

    const res = await updateAddr(id, ctx.request.body)

    ctx.body = {
      code: 0,
      message: '更新地址成功',
      result: res,
    }
  }

  async remove(ctx) {
    const id = ctx.request.params.id
    const res = await removeAddr(id)
    ctx.body = {
      code: 0,
      message: '删除地址成功',
      result: res,
    }
  }

  async setDefault(ctx) {
    const id = ctx.request.params.id
    const user_id = ctx.state.user.id
    const res = await setDefaultAddr(user_id, id)

    ctx.body = {
      code: 0,
      message: '设置默认地址成功',
      result: res,
    }
  }
}

module.exports = new AddrController()
