const { findPost } = require('../../repositories/post.repository')

module.exports = async function(req, res, next) {
  try{
      const isAvailable  = await findPost(slug)
      if(isAvailable == false){
        next(ApiError.badUserRequest("Post does not exist!"))
      }
      else{
        next()
      }
    }
  }
  catch(err){
  	next({err})
  }