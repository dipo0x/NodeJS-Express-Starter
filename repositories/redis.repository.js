const { client } = require('../config/redis.config')
const ApiError = require('../error/ApiError')

const REDIS_EXPIRATION_TIME = 900

exports.createRedisOTP = async function (userID, otp) {
  try{
    const userRedisOTP = userID + otp;                
    await client.set(userRedisOTP, otp);
    client.expire(userRedisOTP, REDIS_EXPIRATION_TIME)
  }
  catch(err){
    next({err})
  }
}

exports.deleteRedisKey = async function (redisKey) {
  try{
    await client.del(redisKey)
  }
  catch(err){
    next({err})
  }
}