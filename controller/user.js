const User = require('../models/User')
const Post = require('../models/Post')
const response = require('../helper/response')
const { encryptPass, isValid } = require('../helper/encrypt')
const { checkUsername, checkEmail } = require('../helper/validasi')
const { signUser } = require('../helper/auth')

const createUser = async(req, res) => {
  let data = req.body
  data.bio = '-'
  data.password = encryptPass(data.password)
  if (req.file) data.foto = req.file.secure_url
  else data.foto = "-"
  
  const user = new User(data)
  // console.log(user)
  try {
    const hasil = await user.save()
    response(res,true, user,'Create akun telah berhasil',201)  
  } catch (error) {
    console.log(error)
    response(res,false, null, error, 201)
  }
  

    

}

const login = async(req, res) => {
  const payload = req.body
  let user
  if (payload.usermail.match(/@/g)) user = await User.findOne({where: { email: payload.usermail }})
  else user = await User.findOne({where: { username: payload.usermail }})

  if (!user) return response(res,false,null,'Akun tidak ditemukan!',401)
  if(isValid(payload.password, user.password)) {
    let data = {}
    data.id_user = user.id_user
    data.nama = user.nama
    data.email = user.email
    const token = signUser(data)
    data.token = token
    return response(res,true, data,'Sukses Login',200)
  } else return response(res,false,null,'Password salah!',401)
}

const updateUser = async(req, res) => {
  const payload = req.body
  let user = await User.findByPk(req.user.id_user)
  if (!user) return response(res,false,null,'Akun tidak ditemukan!',401)

  if (payload.nama) user.nama = payload.nama
  if (payload.bio) user.bio = payload.bio
  if (payload.username) {
    if (!checkUsername(payload.username)) return response(res,false,null,'Username sudah digunakan',401)
    user.username = payload.username
  }
  if (payload.email){
    if (!checkEmail(payload.email)) return response(res,false,null,'email sudah digunakan',401)
    user.email = payload.email
  }
  if (req.file) user.foto = req.file.secure_url
  if (payload.password) user.password = payload.password
  await user.save()
  return response(res, true, user,'Akun sukses diupdate',200)
}

const getUser = async(req, res) => {
  let user = await User.findByPk(req.user.id_user, {attributes : ['nama', 'username', 'email', 'bio', 'foto'],
    include : [{
      model: Post,
      attributes: ['id_post','text', 'gambar', 'createdAt', 'updatedAt']
    }]
  })
  let data = user
  delete data.password
  return response(res, true, data,'Berikut data akun',200)
}

module.exports = {
  createUser,
  login,
  updateUser,
  getUser
}