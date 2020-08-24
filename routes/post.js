const router = require('express-promise-router')()
const Post = require('../controller/post')
const { upload } = require('../helper/upload')
const { validateEmail, validateUsername } = require('../helper/validasi')
const { authenticateToken } = require('../helper/auth')


router.route('/all')
  .get(
    Post.getAllPost
  )

router.route('/add')
  .post(
    authenticateToken,
    upload.single('gambar'),
    Post.addPost
  )

router.route('/:id')
  .post(
    authenticateToken,
    upload.single('gambar'),
    Post.editPost
  )

router.route('/:id')
  .get(
    authenticateToken,
    Post.getPost
  )

router.route('/')
  .get(
    authenticateToken,
    Post.getMyPost
  )

router.route('/delete/:id')
  .delete(
    authenticateToken,
    Post.deletePost
  )

module.exports = router