const fs = require("fs");
const path = require("path");

const { validationResult } = require("express-validator");

const sequelize = require("../utils/database");

const User = require("../models/user");
const Item = require("../models/item");
const UserItemBridge = require("../models/user-item-bridge");
const ImageLink = require("../models/image-link");

exports.getItems = async (req, res, next) => {
    try {
        let results = await Item.findAll({
            include: [
                {
                    model: User,
                    through: {
                        attributes: [
                            "id",
                            "name",
                            "email",
                            "address",
                            "description",
                            "image",
                            "liked",
                            "disliked",
                            "isActivated",
                            "paymentId"
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
        next(err);
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
        next(err);
    }
};

exports.postItem = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const category = req.body.category;
    const imageUrl = req.body.imageUrl;

    console.log(name);
    console.log(description);
    console.log(category);
    console.log(imageUrl);

    try {
        const result = await Item.create({
            name: name,
            description: description,
            category: category,
            isHidden: false
        });

        const item = result.get();
        /*
        await ImageLink.create({
            imageLink: imageUrl,
            itmeId: item.id
        });
        */
        res.status(200).send(JSON.stringify(item));
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        console.log(err);
        next(err);
    }
};

exports.patchItem = async (req, res, next) => {};
exports.deleteItem = async (req, res, next) => {};
