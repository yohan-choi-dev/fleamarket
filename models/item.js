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
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER
    },
    exchangeFor: {
        type: DataTypes.STRING
    },
    isOnSearch: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    itemDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Item;


module.exports = (sequelize, DataTypes) => {



}
