const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER
    },
    exchangeFor: {
        type: DataTypes.STRING
    },
    hidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Item;
