const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const User = require('../models/user')

const Trade = sequelize.define('trade', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ready'
    }
})

User.hasMany(Trade, { as: 'userA' })
User.hasMany(Trade, { as: 'userB' })

module.exports = Trade
