const Sequelize = require('Sequelize');
const sequelize = require('../utils/database');

const Test = sequelize.define('test',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
});

module.exports = Test;
