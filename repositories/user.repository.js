const userData = require('../models/user.model')

exports.findUser = async function (email) {
  let isTrue = false;
  let userID;
	const user = await userData.findOne({email: email})
  if(user){
    isTrue = true
    userID = user.id
  }
  return{
    userID,
    userExist: isTrue == true,
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