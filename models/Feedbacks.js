const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

class Feedbacks extends Model {}
Feedbacks.init({
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
});

module.exports = Feedbacks;

