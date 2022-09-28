const ApiError = require('../error/ApiError')

exports.home = async function (req, res, next) {
  try{
  	const info = req.body.info
  	if(!info){
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