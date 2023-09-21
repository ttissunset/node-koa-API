// DataTypes 是每个字段的数据类型
const { DataTypes } = require('sequelize')
// 导入seq实例
const seq = require('../db/seq')

// 创建User模型
const User = seq.define('user', {
  //! id 字段seq会自动创建并管理，不需要手动设置
  // 定义字段
  username: {
    type: DataTypes.STRING,
    // 设置字段为唯一值
    unique: true,
    // 设置字段为非空
    allowNull: false,
    comment: '用户名，唯一',
  },
  password: {
    type: DataTypes.CHAR(64),
    // 设置字段为非空
    allowNull: false,
    comment: '密码',
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员，0不是管理员，1是管理员',
  },
})

// User.sync() --> 将模型和数据库进行同步，会创建数据表
// 通过 node .\src\model\user.model.js 执行完同步后，须注释掉
// force: true --> 如果数据库存在该表，则删除该表后重新创建
// User.sync({ force: true })

// 导出User模型
module.exports = User
