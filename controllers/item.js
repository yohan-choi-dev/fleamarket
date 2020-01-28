const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Items = require('../models/items');
const Users = require('../models/users');
const sequelize = require('../utils/database');

exports.getItems = async (req, res, next) => {
    let items = [];
    try  {
        items = await Items.findAll();
        if (items.length === 0) {
            const error = new Error('No available item');
            error.statusCode = 401;
            throw error;
        }
        res.status(200).send(JSON.stringify(items));
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        next();
    }
};

exports.getItemsByName = async (req, res, next) => {
    let name = req.params.name;
    let search_query = `SELECT DISTINCT * FROM Items
                        WHERE name LIKE '%${name}%'`
    try {
        let results = await sequelize.query(search_query);
        if (results.length === 0) {
            const error = new Error ('No Search Result');
            error.statusCode = 401;
            throw error;
        }
        res.status(200).send(JSON.stringify(results));
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        next();
    }
}

exports.createItem = async (req, res, next) => {
    //    const errors
    const name = req.body.name;
    const description = req.body.description;


    Items.create();

}

exports.updateItem = async (req, res, next) => {

}

exports.deleteItem = async (req, res, next) => {

}
