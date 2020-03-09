const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Trade = sequelize.define("trade", {
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
        defaultValue: "ready"
    },
});

module.exports = Trade;
