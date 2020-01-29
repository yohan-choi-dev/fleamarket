const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class Posts extends Model {}
Posts.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postDate: DataTypes.DATE
})

//module.exports = Posts;
module.exports = {
    Posts: Posts
}


