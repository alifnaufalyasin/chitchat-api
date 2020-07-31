const response = (res,status,data,message,code) => {
  let resData
  if (status) resData = data
  else {
      if (data == null || data == "") resData = {}
      else resData = data
  }
  let response = {
      success : status,
      message : message,
      code : code,
      data : resData
  }
  // console.log(response)
  res.status(code).send(response)
}

module.exports = response