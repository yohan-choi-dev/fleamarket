const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const Item = require('./item')

const Comment = sequelize.define(
    'Comment',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
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
    },
    {
        timestamps: false,
        updatedAt: false,
        createAt: false
    }
)

Item.hasMany(Comment)
Comment.belongsTo(Item)

module.exports = Comment
