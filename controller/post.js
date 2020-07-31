const Post = require('../models/Post')
const User = require('../models/User')
const response = require('../helper/response')

const addPost = async(req, res) => {
  const user = await User.findByPk(req.user.id_user)
  let data = req.body
  if (req.file) data.gambar = req.file.secure_url
  else {
    data.gambar = "-"
  }
  const post = new Post(data)
  console.log(post)
  await post.save()
  await post.setUser(user)
  response(res,true, post,'Create post telah berhasil',201)  
}

const editPost = async(req, res) => {
  const id_post = Number(req.params.id)
  const post = await Post.findByPk(id_post)
  if (!post) return response(res,false,null,'Post tidak ditemukan!',401)
  if (post.userIdUser != req.user.id_user) return response(res,false,null,'Gagal update, tidak ada akses ke post ini',401)
  if (req.file) post.gambar = req.file.secure_url
  if (req.body.text) post.text = req.body.text
  console.log(post)
  await post.save()
  response(res,true, post,'Post berhasil diedit',201)  
}

const getPost = async(req,res) => {
  const id_post = Number(req.params.id)
  const post = await Post.findByPk(id_post, {
    attributes: ['id_post','text', 'gambar', 'createdAt', 'updatedAt'],
    include : [{
      model: User,
      attributes : ['nama', 'username', 'foto'],
    }]
  })
  console.log(post);
  if (!post) return response(res,false,null,'Post tidak ditemukan!',401)

  response(res,true, post,'Berikut data post',201)
}

const getMyPost = async(req,res) => {
  const id_user = req.user.id_user

  const post = await Post.findAll({
    where: {userIdUser: id_user},
    attributes: ['id_post','text', 'gambar', 'createdAt', 'updatedAt'],
    include : [{
      model: User,
      attributes : ['nama', 'username', 'foto'],
    }]
  })
  console.log(post);
  if (!post) return response(res,false,null,'Post tidak ditemukan!',401)

  response(res,true, post,'Berikut data post',201)
}

const getAllPost = async(req,res) => {

  const post = await Post.findAll({
    attributes: ['id_post','text', 'gambar', 'createdAt', 'updatedAt'],
    include : [{
      model: User,
      attributes : ['nama', 'username', 'foto'],
    }]
  })
  console.log(post);
  if (!post) return response(res,false,null,'Post tidak ditemukan!',401)

  response(res,true, post,'Berikut data post',201)
}

module.exports = {
  addPost,
  editPost,
  getPost,
  getMyPost,
  getAllPost
}