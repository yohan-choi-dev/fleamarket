const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
    },
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    liked: DataTypes.INTEGER,
    disliked: DataTypes.INTEGER,
    isActivated: DataTypes.BOOLEAN,
    paymentId: DataTypes.INTEGER
},{
    timestamp: false,
    updateAt: false,
    createAt: false
});

module.exports = User;
