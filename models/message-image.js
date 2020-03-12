const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const MessageImage = sequelize.define('MessageImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imageUrl: DataTypes.STRING
});

module.exports = MessageImage;
