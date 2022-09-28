const userData = require('../models/user.model')

exports.findUser = async function (email) {
  let isTrue = false;
  try{
  	const user = await userData.findOne({email: email})
    if(user){
      isTrue = true
    }
    return{
      userExist: Object.keys(isTrue).length === false
      user: user
    }
  }
  catch(err){
  	next({err})
  }
}

exports.createUser = function (email, password) {
  try{
    const user = new userData();
    user.email = email
    user.password = password
    user.verification = {
      verified: false,
    }
    user.save()
  }
  catch(err){
    next({err})
  }
}