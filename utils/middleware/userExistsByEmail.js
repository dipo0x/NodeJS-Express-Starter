const { findUser } = require('../../repositories/user.repository')
const ApiError = require('../../error/ApiError')

module.exports.userExistsFail = async function(req, res, next) {
  try{
    let { email } = req.body

    const { userID, userExist } = await findUser(email)
    if(userExist == true){
      next(ApiError.badUserRequest("Email exists")) 
    }
    else{
      next();
    }
  }
  catch(err){
  	next({err})
  }
}

module.exports.userExistSuccess = async function(req, res, next) {
  try{
    let { email } = req.body

    const { userID, userExist } = await findUser(email)
    if(userExist == true){
      next()
    }
    else{
      next(ApiError.badUserRequest('Email not found'))
    }
  }
  catch(err){
    next({err})
  }
}