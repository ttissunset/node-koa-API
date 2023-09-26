const User = require('../model/user.model')

class userService {
  // 创建用户的操作
  async createUser(user_name, password) {
    // TODO: 向数据库中添加数据
    // User.create({
    //   user_name: user_name,
    //   password: password,
    // })

    const res = await User.create({
      user_name,
      password,
    })
    // console.log(res)
    return res.dataValues
  }

  // 对数据库进行户数查询
  async getUserinfo({ id, user_name, password, is_admin }) {
    // 定义where查询条件
    const whereOpt = {}

    // 判断是否传有对应的参数，如果有则即将该参数拷贝到 whereOpt 中
    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    // 通过 User.findOne() 获取查询到的第一条数据
    const res = await User.findOne({
      // 通过 attributes 数组中的特定属性值对数据表进行 select 查询
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      // where 查询条件
      where: whereOpt,
    })

    // 判断是否有返回结果
    return res ? res.dataValues : null
  }

  // 通过id更新用户密码
  async updateById({ id, user_name, password, is_admin }) {
    // 定义where查询条件 --> 根据id查询
    const whereOpt = { id }
    const newUser = {}

    // 判断是否传有对应的参数，如果有则拷贝到 newUser 中
    user_name && Object.assign(newUser, { user_name })
    password && Object.assign(newUser, { password })
    is_admin && Object.assign(newUser, { is_admin })

    // 按照 where 条件更新数据，将id匹配的数据内容更新为 newUser 的数据
    const res = await User.update(newUser, { where: whereOpt })
    // console.log(res)
    return res[0] > 0 ? true : false
  }
}

module.exports = new userService()
