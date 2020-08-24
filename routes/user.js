const router = require('express-promise-router')()
const User = require('../controller/user')
const { upload } = require('../helper/upload')
const { validateEmail, validateUsername } = require('../helper/validasi')
const { authenticateToken } = require('../helper/auth')



router.route('/')
  .post(
    upload.single('foto'),
    validateEmail(),
    validateUsername(),
    User.createUser
  )

router.route('/login')
  .post(
    User.login
  )

router.route('/')
  .put(
    authenticateToken,
    upload.single('foto'),
    User.updateUser
  )

router.route('/')
  .get(
    authenticateToken,
    User.getUser
  )

module.exports = router