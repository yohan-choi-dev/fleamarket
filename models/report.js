const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Report = sequelize.define('report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    report: DataTypes.STRING,
    date: DataTypes.DATE,
    isRequested: DataTypes.BOOLEAN
}, {
    timestamps: false,
    updatedAt: false,
    createAt: false
});

module.exports = Report;
