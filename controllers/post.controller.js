const ApiError = require('../error/ApiError')
const { create_post_validator } = require('../utils/validator')

exports.create_post = async function (req, res, next) {
  try{
    const title = req.body.title
  	const body = req.body.body
    const { errors, valid } = create_post_validator(title, body)
    if(!valid){
      next(ApiError.badUserRequest(errors.error))
    }
  	if(!title || !body ){
  		next(ApiError.badUserRequest("You didn't input your info"))
  	}
  	else{
  		res.status(200).json("success")
  	}
  }
  catch(err){
  	next({})
  }
}