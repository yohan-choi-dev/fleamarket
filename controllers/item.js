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
            attributes: ["id", "email", "name", "liked", "disliked"]
          }
        },
        {
          model: ImageLink
        }
      ]
    });
    res.status(200).send(JSON.stringify(items));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.log(err);
    next(err);
  }
};

exports.getItemById = async (req, res, next) => {
  let itemId = req.params.itemId;
  let search_query = `SELECT * FROM Items
                        WHERE id=${itemId}`;
  try {
    let results = await sequelize.query(search_query, {
      type: sequelize.QueryTypes.SELECT
    });
    if (results.length === 0) {
      const error = new Error("No Search Result");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).send(JSON.stringify(results[0]));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

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
  let userId = req.query.user;

  let search_query = `SELECT * FROM Items i, Users u, UserItemBridges ui 
                      WHERE ui.UserId = u.id AND ui.ItemId = i.id AND u.id=${userId}`;
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
}

exports.getItemsByCategory = async (req, res, next) => { };

exports.postItem = async (req, res, next) => {
  if (!req.file) {
    const err = new Error("Image file is not valid");
    err.statusCode = 422;
    next(err);
  }

  const userId = req.body.userId;
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

    const item = result.get();

    await UserItemBridge.create({
      owned: true,
      isFavorite: false,
      ItemId: item.id,
      UserId: userId
    })

    await ImageLink.create({
      url: imageURL,
      itemId: item.id
    });

    item.imageLink = imageURL;

    res.status(200).send(JSON.stringify(item));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  };
}

exports.patchItem = async (req, res, next) => { };
exports.deleteItem = async (req, res, next) => { };