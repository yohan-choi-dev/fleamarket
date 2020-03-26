const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const Item = require('../models/item')

const ImageLink = sequelize.define(
    'ImageLink',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        updatedAt: false,
        createAt: false,
    }
)

//ImageLink.belongsTo(Item, {foreignKey: 'itemId'});
Item.hasMany(ImageLink, { foreignKey: 'itemId' })
module.exports = ImageLink
