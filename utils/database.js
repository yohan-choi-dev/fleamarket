const Sequelize = require('sequelize')

const database = 'fleamarket-db'
const username = 'fleamarket1'
const password = '4568fasj@E23'

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
