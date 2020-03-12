const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const User = require('./user');

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

User.hasMany(Token);
Token.belongsTo(User);

module.exports = Token;
