// 导入seq链接
const { DataTypes } = require('sequelize')
const seq = require('../db/seq')

// 创建addr模型 映射数据表
const Addr = seq.define('addr', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id',
  },
  consignee: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货人',
  },
  phone: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    comment: '收货人电话',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货地址',
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否默认地址,0不是(默认值),1是',
  },
})

// 同步模型 --> 在数据库创建数据表
// Addr.sync({ force: true })

module.exports = Addr
