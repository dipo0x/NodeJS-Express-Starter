const ApiError = require('../error/ApiError')
const Response = require('../utils/response.handler')
const { post_validator } = require('../utils/validators')
const { allPosts, createPost, checkPost, editPost, findPost, deletePost } = require('../repositories/post.repository')

module.exports.all_Posts = async function(req, res, next){
  const posts = await allPosts()
  return Response.send(
    res,
    200,
    posts
  )
}

module.exports.create_post = async function(req, res, next) {
  try{
    const title = req.body.title
  	const body = req.body.body
    const { errors, valid } = post_validator(title, body)
    if(!valid){
      next(ApiError.badUserRequest(errors.error))
    }
    else{
      const isAvailable  = await checkPost(title, body)
      if(isAvailable == true){
        next(ApiError.badUserRequest("Post with same content exists already!"))
      }
      else{
        createPost(title, body)
        return Response.send(
          res,
          200,
          "You have successfully created a post"
        )
      }
    }
  }
  catch(err){
  	next({err})
  }
}

module.exports.edit_post = async function(req, res, next) {
  try{
    const slug = req.params.slug
    const title = req.body.title
  	const body = req.body.body
    const { errors, valid } = post_validator(title, body)
    if(!valid){
      next(ApiError.badUserRequest(errors.error))
    }
    else{
      const isAvailable  = await findPost(slug)
      if(isAvailable == false){
        next(ApiError.badUserRequest("Post does not exist!"))
      }
      else{
        editPost(title, body, slug)
        return Response.send(
          res,
          200,
          "You have successfully edited the post"
        )
      }
    }
  }
  catch(err){
  	next({err})
  }
}

module.exports.delete_post = async function(req, res, next){
  try{
    const slug = req.params.slug
    const isAvailable  = await findPost(slug)
      if(isAvailable == false){
        next(ApiError.badUserRequest("Post does not exist!"))
      }
      else{
        deletePost(slug)
        return Response.send(
          res,
          200,
          "Post successfully deleted!"
        )
      }
  }
  catch(err){
    next({err})
  }
}