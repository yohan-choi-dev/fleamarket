const redis = require('redis')
const bluebird = require('bluebird')
const _ = require('lodash')

module.exports = _.once((config) => {
    bluebird.promisifyAll(redis)
    const client = redis.createClient()
    const database = {}

    client.on('error', (error) => console.log(error))

    database.getClient = () => {
        return client
    }
    database.config = config

    return database
})
