const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const MessageImage = require('./message-image')

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: DataTypes.STRING
})

Message.hasOne(MessageImage)

module.exports = Message
