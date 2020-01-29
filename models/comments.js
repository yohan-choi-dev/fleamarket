const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class Comments extends Model {}
Comments.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    conmmentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Comments;


