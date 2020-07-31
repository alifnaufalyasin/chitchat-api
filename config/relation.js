const User = require('../models/User')
const Post = require('../models/Post')
const Followers = require('../models/Followers')

User.hasMany(Post)
Post.belongsTo(User)

// User.belongsToMany(User, {through: Followers, as: 'Follower'})
