const { DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        addressId: {
            type: DataTypes.INTEGER
        },
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        totalRate: DataTypes.DOUBLE,
        numTrade: DataTypes.INTEGER,
        isActivated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        paymentId: DataTypes.INTEGER
    },
    {
        timestamp: false,
        updateAt: false,
        createAt: false
    }
)

module.exports = User
