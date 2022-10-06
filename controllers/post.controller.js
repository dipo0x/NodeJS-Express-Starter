const ApiError = require('../error/ApiError')

exports.create_post = async function (req, res, next) {
  try{
    const title = req.body.title
  	const body = req.body.body
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