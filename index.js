require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')
const relation = require('./config/relation')

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const port = process.env.PORT || 3000
const response = require('./helper/response')
const { createUser, updateUser, login, getUser } = require('./controller/user')
const { upload } = require('./helper/upload')
const { deleteFoto, validateEmail, validateUsername } = require('./helper/validasi')
const { authenticateToken } = require('./helper/auth')
const { addPost, editPost } = require('./controller/post')

app.route('/')
  .get((req,res) => {
      res.status(200).send('Hello')
    }
  )

//route User
app.route('/api/users')
  .post(
    upload.single('foto'),
    validateEmail(),
    validateUsername(),
    createUser
  )

app.route('/api/users/login')
  .post(
    login
  )

app.route('/api/users')
  .put(
    authenticateToken,
    upload.single('foto'),
    updateUser
  )

app.route('/api/users')
  .get(
    authenticateToken,
    getUser
  )


//route Post
app.route('/api/post/add')
  .post(
    authenticateToken,
    upload.single('gambar'),
    addPost
  )

app.route('/api/post/:id')
  .post(
    authenticateToken,
    upload.single('gambar'),
    editPost
  )


app.use((req,res,next) => {
  let err = new Error('Route not found')
  err.status = 404
  next(err)
})

app.use(async (err,req,res,next) => {
  await deleteFoto(req)
  const {message} = err
  const status = err.status || 500
  console.log(err)
  response(res,false,null,message,status)
})

app.listen(port, () => {
  db.sync({  })
    .then(() => console.log(`app is running on port ${port}`))
    .catch(err => console.log(err.message))
})