const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


class Categories extends Model {}
Categories.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    category: Dataypes.STRING(255)
})

module.exports = Categories;

