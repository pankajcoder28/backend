const { default: Redis } = require('ioredis')


const redis = new Redis({
    host : process.env.redis_host ,
    port : process.env.redis_port,
    password : process.env.redis_password
})

redis.on('connect',()=>{
    console.log("server is connected with redis")
})

module.exports = redis