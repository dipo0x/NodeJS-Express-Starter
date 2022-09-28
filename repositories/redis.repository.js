const { client } = require('../config/redis.config')

const REDIS_EXPIRATION_TIME = 900

exports.createRedisOTP = function (userID, otp) {
  const userRedisOTP = userID + otp;                
  await client.set(userRedisOTP, otp);
  client.expire(userRedisOTP, REDIS_EXPIRATION_TIME);
}