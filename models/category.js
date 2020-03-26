const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const Category = sequelize.define(
    'Category',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        category: DataTypes.STRING(255),
    },
    {
        timestamps: false,
        updatedAt: false,
        createAt: false,
    }
)

module.exports = Category
