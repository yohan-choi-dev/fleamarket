const { Sequelize, Model, DataTypes } = require('sequelize');

const database = "prj666_201a05"; 
const username = "prj666_201a05";
const password = "hgAZ@4435";

const sequelize = new Sequelize(database, username, password, {
    host: 'mymysql.senecacollege.ca',
    dialect: 'mysql'
});

module.exports = sequelize;

/*
sequelize
    .authenticate()
    .then(() => {
        console.log('Success to connect mysql server');
    })
    .catch(err => {
        console.log(err);
        console.log('Fail to connect mysql server');
    });
*/


