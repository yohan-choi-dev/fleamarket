const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const UserChattingBridge = require('./user-chatroom-bridge')

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: DataTypes.STRING,
    status: DataTypes.STRING
})

Message.belongsTo(UserChattingBridge)

module.exports = Message
