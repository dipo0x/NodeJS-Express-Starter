const ApiError = require('../error/ApiError')

exports.home = async function (req, res, next) {
  try{
  	const info = req.body.info
  	if(!info){
  		next(ApiError.badUserRequest("You didn't input your info")) ///THE TYPE OF ERROR YOU WANT TO PASS. 
        //CHECK ERROR/API ERROR TO SEE ALL THE ERRORS AVAILABLE.
  	}
  	else{
  		res.status(200).json("success")
  	}
  }
  catch(err){
  	next({})
  }
}