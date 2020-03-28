const redis = require('redis')
const bluebird = require('bluebird')
const _ = require('lodash')

bluebird.promisifyAll(redis)

module.exports = _.once(() => {
    const redisService = {}
    const config = {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASS || 'password'
    }
    const client = redis.createClient(config)

    
    const redisService.config = config

    client.on('error', (error) => console.log(error))

    return redisService
})
