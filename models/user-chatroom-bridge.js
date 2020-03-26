const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const User = require('./user')
const Chatroom = require('./chatroom')

const UserChatroomBridge = sequelize.define('UserChatroomBridge', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true,
    },
})

User.belongsToMany(Chatroom, { through: 'UserChatroomBridge' })
Chatroom.belongsToMany(User, { through: 'UserChatroomBridge' })

module.exports = UserChatroomBridge
