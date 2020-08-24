require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/db')
const relation = require('./config/relation')
const cors = require('cors')


const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 3000
const response = require('./helper/response')
const { deleteFoto } = require('./helper/validasi')
const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')


app.route('/')
  .get((req,res) => {
      res.status(200).send('Hello')
    }
  )

//route User
app.use('/api/users', userRoutes)

//route Post
app.use('/api/post', postRoutes)


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