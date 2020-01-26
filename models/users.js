const sequelize = require('../utils/database');
const { resolver } = require('graphql-sequelize');

const Users = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
    },
    description: Sequelize.STRING,
    image: Sequelize.STRING,
    liked: Sequelize.INTEGER,
    disliked: Sequelize.INTEGER,
    isActivated: Sequelize.BOOLEAN,
    paymentId: Sequelize.INTEGER
});

module.exports = Users;
