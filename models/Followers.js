const Sequelize = require('sequelize')
const db = require('../config/db')

const Followers = db.define(
  'followers',
  {
  }
)

module.exports = Followers