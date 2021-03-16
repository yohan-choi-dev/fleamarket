const Sequelize = require('sequelize')

// const host = process.env.DB_HOST;
const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
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
