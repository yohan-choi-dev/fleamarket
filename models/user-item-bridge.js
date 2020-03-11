const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = require('./user');
const Item = require('./item');

const UserItemBridge = sequelize.define('UserItemBridge', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    owned: DataTypes.BOOLEAN,
    isFavorite: DataTypes.BOOLEAN
});

User.belongsToMany(Item, { through: 'UserItemBridge' });
Item.belongsToMany(User, { through: 'UserItemBridge' });

module.exports = UserItemBridge;
