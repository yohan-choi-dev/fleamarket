const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const ImageLink = sequelize.define('ImageLink',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
    updatedAt: false,
    createAt: false
});

module.exports = ImageLink;
