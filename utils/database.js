const Sequelize = require('sequelize')

const database = 'prj666_201a05'
const username = 'prj666_201a05'
const password = 'hgAZ@4435'

const sequelize = new Sequelize(database, username, password, {
    host: 'mymysql.senecacollege.ca',
    dialect: 'mysql',
    pool: {
        max: 30,
        min: 0,
        acquire: 400000,
        evict: 200000
    },
    logging: false
})

module.exports = sequelize
