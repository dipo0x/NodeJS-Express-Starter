const Redis = require("ioredis");

const client = new Redis({
    host: process.env.REDIS_ENDPOINT_URI,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT,   
});

try{
    client.on("connect", function(){
      console.log("Connected to Redis Server")
    });
}
catch(err){}

module.exports= { client }