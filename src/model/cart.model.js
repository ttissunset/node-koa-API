const { DataTypes } = require('sequelize')
// 导入sequelize链接
const seq = require('../db/seq')
const Goods = require('./goods.model')

// 定义cart模型映照数据库cart表
const Cart = seq.define('carts', {
  // 商品id
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品ID',
  },
  // 用户id
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户ID',
  },
  // 商品数量
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '商品数量',
  },
  // 商品是否选中
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否选中',
  },
})

// 同步数据 创建数据表 
// { force: true } --> 数据表不存在则创建。数据表存在则删除后重新创建
// Cart.sync({ force: true })

// 将 Cart 表和 Goods 表进行关联
Cart.belongsTo(Goods,{
  // 指定外键
  foreignKey: 'goods_id',
  // 设置别名
  as:'goods_info'
})

module.exports = Cart
