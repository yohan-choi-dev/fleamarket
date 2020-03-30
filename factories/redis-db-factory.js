const redis = require('redis')
const bluebird = require('bluebird')

module.exports = (config) => {
    bluebird.promisifyAll(redis)
    const client = redis.createClient()
    const database = {}

    client.on('error', (error) => console.log(error))

    database.getClient = () => {
        return client
    }
    database.config = config

    return database
}
