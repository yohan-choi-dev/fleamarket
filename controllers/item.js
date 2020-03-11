const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const { validationResult } = require("express-validator");

const sequelize = require("../utils/database");

const User = require("../models/user");
const Item = require("../models/item");
const UserItemBridge = require("../models/user-item-bridge");
const ImageLink = require("../models/image-link");

exports.getItems = async (req, res, next) => {
  try {
    let items = await Item.findAll({
      include: [
        {
          model: User,
          through: {
            attributes: ["id", "email", "name", "liked", "disliked"],
            where: {
              isActivated: true
            }
          }
        },
        {
          model: ImageLink,
          through: {
            attributes: ["url"]
          }
        }
      ]
    });

    console.log(items[0].dataValues);
    res.status(200).send(JSON.stringify(items));
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

exports.getItemsByCategory = async (req, res, next) => {

};

exports.postItem = async (req, res, next) => {
  if (!req.file) {
    const err = new Error("Image file is not valid");
    err.statusCode = 422;
    next(err);
  }
  //console.log(req);
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const imageURL = req.file.path;

  try {
    const result = await Item.create({
      name: name,
      description: description,
      category: category,
      isHidden: false
    });
    console.log(imageURL);

    const item = result.get();
    console.log(item);
    await ImageLink.create({
      url: imageURL,
      itemId: result.get().id
    });

    item.imageLink = imageURL;
    console.log(ImageLink.rawAttributes);
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
