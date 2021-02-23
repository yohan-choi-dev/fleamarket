const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const User = require('./user')

const Chatroom = sequelize.define('Chatroom', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    endpoint: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.hasMany(Chatroom)

module.exports = Chatroom
