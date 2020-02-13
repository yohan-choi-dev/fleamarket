const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Notification = sequelize.define('Notification', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: DataTypes.DATE,
    notification: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN
}, {
    timestamps: false,
    updatedAt: false,
    createAt: false
});

module.exports = Notification;
