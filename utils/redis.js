const redis = require('redis')
const { promisify } = require('util')

class Client {
    constructor() {
        this.client = redis.createClient()
        this.client.hmsetAsync = promisify(this.client.hmset).bind(this.client)
        this.client.hmgetAsync = promisify(this.client.hgetall).bind(
            this.client
        )
        this.client.hgetallAsync = promisify(this.client.hgetall).bind(
            this.client
        )
        this.client.existsAsync = promisify(this.client.exists).bind(
            this.client
        )
    }
    init() {
        this.client.on('error', (error) => console.log(error))
    }
}

const client = new Client()
module.exports = client