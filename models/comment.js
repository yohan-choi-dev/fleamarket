const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Item = require("./item");
const User = require("./user");

const Comment = sequelize.define(
    "Comment",
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
        itemId: {
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
);

module.exports = Comment;
