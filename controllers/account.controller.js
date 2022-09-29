const bcryptjs = require('bcryptjs')
const userData = require('../models/user.model')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const Response = require('../utils/response.handler')
const { OTPSender, resetPasswordEmailSender, newPassWordNotifier } = require('../services/emailSender')
const { signup, reset_password_validator } = require('../utils/validators')
const { client } = require('../config/redis.config')
const { findUser, createUser } = require('../repositories/user.repository')
const { createRedisOTP, deleteRedisKey } = require('../repositories/redis.repository')

const REDIS_EXPIRATION_TIME = 900
    
module.exports.register = async function(req, res, next) {
  try{
    let { email, password } = req.body
    email = email.trim()
    password = password.trim()
    const newPassword = await bcryptjs.hash(password, 10)
    const { errors, valid } = signup(email, password);
    const { userID, userExist } = await findUser(email)
    if(userExist == true){
    	next(ApiError.badUserRequest("Email exists")) 
    }
    else{
      if(!valid){
        next(ApiError.badUserRequest(errors.error))
      }
      else{
        createUser(email, newPassword);
        const otp = Math.floor(100000 + Math.random() * 900000)
        createRedisOTP(userID, otp)
        OTPSender(email, otp)

        const accessToken = jwt.sign({_id: userID}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h'  })

        return Response.send(
          res,
          200,
          {
          	token: accessToken,
          	message: "Sign up successful. Please input the OTP sent to your mail"
          }
        )
      }
    }
  }
  catch(err){
    next({err})
  }
}

module.exports.otp = async function(req, res, next) {
  try{
    let { otp } = req.body
    otp = otp.trim()
    const otpData = await client.get(req.user.id+otp)
    const userLoginAttempts = `${req.user.id}attempts`
    const userLockAccount = `${req.user.id}lock`
    const attemptInfo = await client.get(userLoginAttempts)
    if(attemptInfo || !otpData){
      const lockInfo = await client.get(userLockAccount)
      if(lockInfo){
        next(ApiError.badUserRequest('Your login is still temporarily restricted. Check back soon'))
      }
      else{
        if(attemptInfo == 4){
          client.set(userLockAccount, req.user.id);
          client.expire(userLockAccount, REDIS_EXPIRATION_TIME);
          next(ApiError.badUserRequest(`Too much wrong OTP. Try again in 15 minutes by trying to login`))
        }
        else{
          if(userLoginAttempts && !otpData){
            const newNumber = (Number(attemptInfo)+1)
            client.set(userLoginAttempts, newNumber)
            const availableAttempts = 4 - (Number(attemptInfo))
            next(ApiError.badUserRequest(`Invalid OTP, you have ${ availableAttempts } attempts left`))
          }
          else{
            if(!userLoginAttempts && !otpData){
              client.set(userLoginAttempts, 1);
              client.expire(userLoginAttempts, REDIS_AUTH_EXPIRATION_TIME);
              next(ApiError.badUserRequest("Invalid OTP, you have 3 attempts left"))
            }
            else{
              req.user['verification'].verified = true
              req.user.save()
              return Response.send(
                res,
                200,
                "OTP Verified. Proceed to dashboard"
              )
            }
          } 
        } 
      }
    }
  }
  catch(err){
    next({err})
  }
}

module.exports.login = async function(req, res, next) {
  try{
    const { email, password } = req.body
    const { userExist } = findUser(email)
    if(userExist){
      userData.comparePassword(password, user.password, async (err, isMatch)=>{
        if(!isMatch){
          const userLoginAttempts = `${user.id}attempts`
          const userLockAccount = `${user.id}lock`
          const attemptInfo = await client.get(userLoginAttempts)

          const lockInfo = await client.get(userLockAccount)
          if(lockInfo){
            next(ApiError.badUserRequest('Your login is still temporarily restricted. Check back soon')) ///THE TYPE OF ERROR YOU WANT TO PASS. 
            //CHECK ERROR/API ERROR TO SEE ALL THE ERRORS AVAILABLE.
          }
          else{
            if(attemptInfo == 4){
              client.set(userLockAccount, user.id);
              client.expire(userLockAccount, REDIS_EXPIRATION_TIME);
              next(ApiError.badUserRequest(`Your login is now temporarily restricted anyway. Login to get your code again in 15 minutes, nonsense!.`))
            }
            else{
              if(userLoginAttempts){
                const newNumber = (Number(attemptInfo)+1)
                client.set(userLoginAttempts, newNumber)
                const availableAttempts = 4 - (Number(attemptInfo))
                next(ApiError.badUserRequest(`Invalid login credentials, you have ${ availableAttempts } attempts left`))
              }
              else{
                client.set(userLoginAttempts, 1);
                client.expire(userLoginAttempts, REDIS_AUTH_EXPIRATION_TIME);
                next(ApiError.badUserRequest("Invalid login credentials, you have 3 attempts left"))
              } 
            } 
          }
        }
        else{
          const accessToken = jwt.sign({_id: user.id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h'  })
          const theUser = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET )
          const theId = theUser._id
          req.user = await userData.findById({_id: theId})

          if(user['verification'].verified == false){
            const otp = Math.floor(100000 + Math.random() * 900000)
            const userRedisOTP = user.id + otp;                
            await client.set(userRedisOTP, otp);
            client.expire(userRedisOTP, REDIS_EXPIRATION_TIME);
            OTPSender(email, otp)
            return Response.send(
              res,
              200,
              {
                token: accessToken,
                message: "We just sent you the OTP to activate your account. Input the OTP in the next page"
              }
            )
          }
          else{
            return Response.send(
              res,
              200,
              accessToken
            )
          }
        }
      })
    }
    else{
      next(ApiError.badUserRequest('Email not found'))
    }
  }
  catch(err){
    next({err})
  }
}

module.exports.reset_password = async function(req, res, next) {
  try{
    const { email } = req.body
    const { userID, userExist } = await findUser(email)
    if(userExist == true){

      const otp = Math.floor(100000 + Math.random() * 900000)        
      createRedisOTP(userID, otp)
      resetPasswordEmailSender(email, otp)

      const accessToken = jwt.sign({_id: userID}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h'  })

      return Response.send(
        res,
        {
          token: accessToken,
          message: "OTP successfully sent. Check your mail."
        }
      )
    }
    else{
      next(ApiError.badUserRequest('Email not found'))
    }
  }
  catch(err){
    next({err})
  }
}

module.exports.reset_password_otp = async function(req, res, next) {
  try{
    const { otp } = req.body
    const otpData = await client.get(req.user.id+otp)
    if(otpData){
      deleteRedisKey(req.user.id+otp)
      return Response.send(
        res,
        200,
        "Verified. Proceed to input new password"
      )
    }
    else{
      next(ApiError.badUserRequest("Token expired"))
    }
  }
  catch(err){
    next({err})
  }
}

module.exports.reset_password_confirm = async function(req, res, next) {
  try{
    const { newPassword } = req.body
    const { errors, valid } = reset_password_validator(newPassword)
    if(!valid){
      next(ApiError.badUserRequest(errors.password))
    }
    else{
      const password = await bcryptjs.hash(newPassword, 10)
      req.user.password = password
      req.user.save()
      newPassWordNotifier(req.user.email)
      return Response.send(
        res,
        200,
        "New password set"
      )
    }
  }
  catch(err){
    next({err})
  }
}