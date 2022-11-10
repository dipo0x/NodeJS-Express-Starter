const jwt = require('jsonwebtoken')
const userData = require('./../../models/user.model')
const ApiError = require('./../../error/ApiError')
const seeders = require('./../../config/seeders.config')

module.exports = async function(req, res, next){
    try{
        if(!req.headers.authorization){
            next(ApiError.badRequest("No Authorization")) 
        }
        else{    
            const token = req.headers.authorization.split(" ")[1]   
            if(!req.headers.authorization.startsWith("Bearer")){
                next(ApiError.badRequest("Invalid Authorization")) 
            }
            else{
               jwt.verify(token, seeders.ACCESS_TOKEN_SECRET, async(err, user) => {
                    if(err){
                        next(ApiError.badUserRequest('Login to continue')) 
                    }
                    else{
                        const theId = user._id
                        req.user = await userData.findById({_id: theId})
                        next()
                    }
                })
            } 
        }
    }
    catch(err){
        next({err})
    }
}