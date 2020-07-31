const User = require('../models/User')
const cloudinary = require('../config/cloudinary')

const deleteFoto = async req => {
  console.log('hapus');
  if (req.file) {
    console.log(req.file);
    await cloudinary.uploader.destroy(req.file.public_id)
  }else{
  }
}

const validateEmail = () => {
  return async (req,res,next) => {
    const {email} = req.body
    const user = await User.findOne({where : {email}})
    if (user) {
      let err = new Error('Email sudah digunakan')
      err.status = 400
      return next(err)
    }
    next()
  }
}

const validateUsername = () => {
  return async (req,res,next) => {
    const {username} = req.body
    const user = await User.findOne({where : {username}})
    if (user) {
      await deleteFoto(req)
      let err = new Error('Username sudah digunakan')
      err.status = 400
      return next(err)
    }
    next()
  }
}

const checkUsername = async (username) => {
    const user = await User.findOne({where : {username}})
    if (user) return false
}

const checkEmail = async (email) => {
  const user = await User.findOne({where : {email}})
  if (user) return false
}


module.exports = {
  deleteFoto,
  validateEmail,
  validateUsername,
  checkUsername,
  checkEmail
}