const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const sequelize = require("../utils/database");
const { asyncForEach } = require('../utils/async-for-each');
const Item = require("../models/item");
const UserItemBridge = require("../models/user-item-bridge");
const ImageLink = require("../models/image-link");

exports.getItems = async (req, res, next) => {
  let search_query = `SELECT i.id, i.name as "name", i.description, u.id as "userId", u.name as "userName" FROM Items i, Users u, UserItemBridges ui 
                      WHERE ui.UserId = u.id AND ui.ItemId = i.id AND i.hidden=0`;
  try {
    let items = await sequelize.query(search_query, {
      type: sequelize.QueryTypes.SELECT
    });

    let results = [];

    await asyncForEach(items, async (item) => {
      let search_query = `SELECT il.url FROM ImageLinks il
                      WHERE il.itemId=${item.id} LIMIT 1`;
      let images = await sequelize.query(search_query, {
        type: sequelize.QueryTypes.SELECT
      });
      results.push({
        ...item,
        imageUrls: images.map(image => image.url)
      });
    });

    res.status(200).send(JSON.stringify(results));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getItemById = async (req, res, next) => {
  let itemId = req.params.itemId;

  let search_query = `
    SELECT  i.id, i.name as "name", i.description, 
            u.id as "userId", u.name as "userName" 
    FROM Items i, Users u, UserItemBridges ui, ImageLinks il 
    WHERE ui.UserId = u.id AND ui.ItemId = i.id AND il.itemId = i.id AND i.hidden=0 AND i.id=${itemId} LIMIT 1;
  `;
  try {
    let item = await sequelize.query(search_query, {
      type: sequelize.QueryTypes.SELECT
    });

    let item_images_query = `
      SELECT il.url
      FROM Items i, ImageLinks il 
      WHERE il.itemId = i.id AND i.id=${item[0].id};
    `;

    let itemImages = await sequelize.query(item_images_query, {
      type: sequelize.QueryTypes.SELECT
    });
    item[0].imageUrls = [];

    itemImages.forEach((image, index) => {
      item[0].imageUrls.push(image.url);
    })

    const result = item[0];

    res.status(200).send(JSON.stringify(result));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getItemsByName = async (req, res, next) => {
  let name = req.query.name;
  let search_query = `
    SELECT  i.id, i.name as "name", i.description, 
            u.id as "userId", u.name as "userName" 
    FROM Items i, Users u, UserItemBridges ui
    WHERE ui.UserId = u.id AND ui.ItemId = i.id
    AND i.hidden=0
    AND (i.name LIKE '%${name}%'
    OR i.description LIKE '%${name}%');
  `;
  try {
    let items = await sequelize.query(search_query, {
      type: sequelize.QueryTypes.SELECT
    });

    let results = [];

    await asyncForEach(items, async (item) => {
      let item_images_query = `
        SELECT il.url
        FROM Items i, ImageLinks il
        WHERE i.id=il.itemId AND i.id=${item.id} LIMIT 1;
      `;
      let itemImageUrls = await sequelize.query(item_images_query, {
        type: sequelize.QueryTypes.SELECT
      });

      results.push({
        ...item,
        imageUrl: itemImageUrls[0].url
      });
    });

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
  let favorited = req.query.favorited;
  let owned = req.query.owned;

  let search_query = `SELECT i.id, i.name as "name", i.description, u.id as "userId", u.name as "userName" FROM Items i, Users u, UserItemBridges ui 
                      WHERE ui.UserId = u.id AND ui.ItemId = i.id AND i.hidden=0 AND u.id=${userId} `;

  if (favorited) {
    search_query += ` AND ui.favorited=${favorited}`;
  } else if (owned) {
    search_query += ` AND ui.owned=${owned}`;
  }

  try {
    let items = await sequelize.query(search_query, {
      type: sequelize.QueryTypes.SELECT
    });

    let results = [];

    await asyncForEach(items, async (item) => {
      let search_query = `SELECT il.url FROM ImageLinks il
                      WHERE il.itemId=${item.id}`;
      let images = await sequelize.query(search_query, {
        type: sequelize.QueryTypes.SELECT
      });

      results.push({
        ...item,
        imageUrls: images.map(image => image.url)
      });
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

  const userId = req.body.userId;
  const name = req.body.name;
  const category = req.body.category;
  const description = req.body.description;
  const images = req.files;

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
      favorited: false,
      ItemId: item.id,
      UserId: userId
    });

    await asyncForEach(images, async (image) => {
      await ImageLink.create({
        url: image.path,
        itemId: item.id
      });
    });

    res.status(200).send(JSON.stringify(item));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  };
}

exports.patchItem = async (req, res, next) => { };
exports.deleteItem = async (req, res, next) => { };

exports.updateItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  const userId = req.body.userId;

  // const favorited = req.body.favorited;
  const owned = req.body.owned;
  const name = req.body.name;
  const description = req.body.description;

  let update_query = ``;
  let search_query = `
    SELECT i.id, i.name, i.description, i.price 
    FROM Items i, Users u, UserItemBridges ui
    WHERE i.id = ui.ItemId AND u.id = ui.UserId AND ui.ItemId=${itemId} AND ui.UserId=${userId};
  `;

  // if (favorited == 0 || favorited == 1)
  //   update_query += `UPDATE UserItemBridges SET favorited=${favorited} WHERE ItemId=${itemId} AND UserId=${userId};`;
  if (owned == 0 || owned == 1)
    update_query += `UPDATE UserItemBridges SET owned=${owned} WHERE ItemId=${itemId} AND UserId=${userId};`;
  if (name)
    update_query += `UPDATE Items SET name='${name}' WHERE ItemId=${itemId};`;
  if (description)
    update_query += `UPDATE Items SET description='${description}' WHERE ItemId=${itemId};`;

  try {
    await sequelize.query(update_query, {
      type: sequelize.QueryTypes.UPDATE
    });

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