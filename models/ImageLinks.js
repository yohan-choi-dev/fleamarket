const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class ImageLink extends Model {}
ImageLink.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postId: {
    }
})

module.exports = ImageLink;
