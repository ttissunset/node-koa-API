const { DataTypes } = require('sequelize')
const seq = require('../db/seq.js')

// 定义 goods 表的字段
const Goods = seq.define('goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称',
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格',
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品库存',
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片',
  },
})

// 通过 Goods.sync({ force: true }) 强制创建goods表
// Goods.sync({ force: true })

module.exports = Goods
