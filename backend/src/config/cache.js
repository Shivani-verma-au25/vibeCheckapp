import Redis from 'ioredis';
import {configrations} from '../config/congi.js'

// configrations
const redis = new Redis({
    port: configrations.redisPort,
    host: configrations.redisHost,
    password: configrations.redisPassword
});

// console.log('Redis Configurations:', {
//     port: configrations.redisPort,
//     host: configrations.redisHost,
//     password: configrations.redisPassword ? '******' : null, // Hide password in logs
// });

// connect to redis server
redis.on('connect', () =>{
    console.log ("Server is connect to redis server")
});

// error handler
redis.on("error" ,(err) =>{
    console.log("Redis server is not connected",err)
})
export default redis;