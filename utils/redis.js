const redis = require('redis')
const { promisify } = require('util')

class Redis {
    constructor() {
        this.redis = redis.createClient()
        this.redis.hmsetAsync = promisify(this.redis.hmset).bind(this.redis)
        this.redis.hmgetAsync = promisify(this.redis.hgetall).bind(
            this.redis
        )
        this.redis.hgetallAsync = promisify(this.redis.hgetall).bind(
            this.redis
        )
        this.redis.existsAsync = promisify(this.redis.exists).bind(
            this.redis
        )
    }
    init() {
        this.redis.on('error', (error) => console.log(error))
    }
}

const myRedis = new Redis()
module.exports = myRedis