const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient()

client.hmsetAsync = promisify(client.hmset).bind(client)
client.hmgetAsync = promisify(client.hgetall).bind(client)
client.hgetallAsync = promisify(client.hgetall).bind(client)
client.existsAsync = promisify(client.exists).bind(client)

module.exports = {
    init: () => {
        client.on('error', error => console.log(error))
    },
    getClient: () => {
        return client
    }
}
