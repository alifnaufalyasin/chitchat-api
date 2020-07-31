const jwt = require('jsonwebtoken')
// require('dotenv').config()


function signUser(data) {
  return jwt.sign(data, process.env.tokenSecret, { expiresIn: 60*1440}) // 60detik/1menitnp * 30 = 30 menit
}

async function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  if (token == null) {
    const err = new Error('Authentication tidak ditemukan')
    err.status = 401
    next(err)
  }

  jwt.verify(token, process.env.tokenSecret, (err,user) => {
    if (err) {
      const err = new Error('Authentication has expired')
      err.status = 419
      return next(err)
    }
    req.user = user
    next()
  })
}

module.exports = {
  signUser,
  authenticateToken
}