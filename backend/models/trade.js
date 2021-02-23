const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const User = require('../models/user')
const Item = require('../models/item')

const Trade = sequelize.define('Trade', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ready'
    }
})

Trade.belongsTo(User, { as: 'userA' })
Trade.belongsTo(User, { as: 'userB' })
Trade.belongsTo(Item, { as: 'itemA' })
Trade.belongsTo(Item, { as: 'itemB' })

module.exports = Trade
