const Sequelize = require('sequelize')

const database = 'test'
const username = 'postgres'
const password = 'helloworld'

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 30,
        min: 0,
        acquire: 400000,
        evict: 200000
    },
    logging: false
})

module.exports = sequelize
