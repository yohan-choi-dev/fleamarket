const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Feedback = sequelize.define('Feedback', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    feedbackDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    writerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    updatedAt: false,
    createAt: false
})

module.exports = Feedback;

