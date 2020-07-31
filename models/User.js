const Sequelize = require('sequelize')
const db = require('../config/db')

const User = db.define(
    'users',
    {
      id_user: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama : {
        type : Sequelize.STRING,
        allowNull : false
      },
      username : {
        type : Sequelize.STRING,
        unique: true,
        allowNull : false
      },
      email : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false,
        validate: {
          isEmail: {
            msg: "Yang anda masukkan bukan email, silahkan cek kembali"
          }
        }
      },
      bio : {
        type : Sequelize.STRING,
        allowNull : false
      },
      foto : {
        type : Sequelize.STRING,
        allowNull : false
      },
      password : {
        type : Sequelize.STRING,
        allowNull : false
      }
  }
)

module.exports = User