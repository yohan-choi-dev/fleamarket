const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    postDate: DataTypes.DATE
}, {
    timestamps: false,
    updatedAt: false,
    createAt: false
});

module.exports = Post;





