const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../utils/database');


const Items = sequelize.define('Items', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER
    },
    exchangeFor: {
        type: Sequelize.STRING
    },
    isOnSearch: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    itemDate: {
        type: Sequelize.DATE,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    updatedAt: false,
    createAt: false
});

module.exports = Items;
