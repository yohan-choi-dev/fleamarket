const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const Item = require('./item')
const Category = require('./category')

const ItemCategoryBridge = sequelize.define('ItemCategoryBridge', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})

Item.belongsToMany(Category, { through: 'ItemCategoryBridge' })
Category.belongsToMany(Item, { through: 'ItemCategoryBridge' })

module.exports = ItemCategoryBridge
