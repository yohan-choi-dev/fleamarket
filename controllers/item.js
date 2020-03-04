const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const sequelize = require("../utils/database");
const Item = require("../models/item");
const User = require("../models/user");
const UserItemBridge = require("../models/user-item-bridge");

exports.getItems = async (req, res, next) => {
    try {
        let results = await Item.findAll({
            include: [
                {
                    model: User,
                    through: {
                        attribute: [
                            "id",
                            "name",
                            "email",
                            "address",
                            "description",
                            "image",
                            "liked",
                            "disliked",
                            "isActivated",
                            "paymentId",
                            "createAt",
                            "updateAt"
                        ]
                    }
                }
            ]
        });

        res.status(200).send(JSON.stringify(results));
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        next(err);
    }
};

exports.getItemsByName = async (req, res, next) => {
    let name = req.query.name;
    let search_query = `SELECT * FROM Items
                        WHERE (name LIKE '%${name}%'
                        OR description LIKE '%${name}%');`;
    try {
        let results = await sequelize.query(search_query, {
            type: sequelize.QueryTypes.SELECT
        });
        if (results.length === 0) {
            const error = new Error("No Search Result");
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
};

exports.getItemsByUser = async (req, res, next) => {
    let user = req.query.user;
    let search_query = `SELECT * FROM Items
                        WHERE (userId = ${user});`;
    try {
        let results = await sequelize.query(search_query, {
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).send(JSON.stringify(results));
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        next();
    }
};

exports.createItem = async (req, res, next) => {
    //    const errors
    const name = req.body.name;
    const description = req.body.description;

    Items.create();
};

exports.updateItem = async (req, res, next) => {};

exports.deleteItem = async (req, res, next) => {};
