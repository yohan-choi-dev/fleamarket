const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const UserItemBridge = sequelize.define('UserItemBridge', {
    owned: DataTypes.BOOLEAN,
    isFavorite: DataTypes.BOOLEAN
},{
    timestamp: false,
    updateAt: false,
    createAt: false
});

module.exports = UserItemBridge;
