const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: DataTypes.STRING,
    image: DataTypes.STRING
},{
    timestamps: false,
    updatedAt: false,
    createAt: false
});

module.exports = Message;
