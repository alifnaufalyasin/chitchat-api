const Sequelize = require('sequelize')
const db = require('../config/db')

const Post = db.define(
    'post',
    {
      id_post: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text : {
        type : Sequelize.STRING,
        allowNull : false
      },
      gambar : {
        type : Sequelize.STRING,
        allowNull : false
      }
  },
  {
    paranoid: true,
  }
)

module.exports = Post