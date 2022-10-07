const postData = require('../models/post.model')
const crypto = require("crypto");

exports.allPosts = async function () {
    const post = await postData.find({}).select({ _id: 0, __v:0, timeStamp:0 });
    return post
}

exports.createPost = async function (title, body) {
    const post = new postData();
    post.title = title
    post.body = body
    post.slug = crypto.randomBytes(12).toString('hex')
    post.save()
}

exports.checkPost = async function (title, body) {
    let isAvailable = false;
    const post = await postData.findOne({title: title, body: body})
    if(post){
        isAvailable = true
    }
    else{
        isAvailable = false
    }
    return isAvailable 
}

exports.findPost = async function (slug) {
    let isAvailable = false;
    const post = await postData.findOne({slug: slug})
    if(post){
        isAvailable = true
    }
    else{
        isAvailable = false
    }
    return isAvailable 
}

exports.editPost = async function (title, body, slug) {
    const post = await postData.findOne({slug: slug})
    post.title = title || null
    post.body = body || null
    post.save()
}

exports.deletePost = async function (slug) {
    await postData.findOneAndDelete({slug: slug})
}