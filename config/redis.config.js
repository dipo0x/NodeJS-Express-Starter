const Redis = require("ioredis");
const seeders = require('./seeders.config')

const client = new Redis({
    host: seeders.REDIS_ENDPOINT_URI,
    username: seeders.REDIS_USERNAME,
    password: seeders.REDIS_PASSWORD,
    port: seeders.REDIS_PORT,   
});

try{
    client.on("connect", function(){
      console.log("Connected to Redis Server")
    });
}
catch(err){}

module.exports = { client }