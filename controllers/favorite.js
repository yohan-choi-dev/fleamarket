const sequelize = require("../utils/database");

exports.addFavorite = async (req, res, next) => {
  const userId = req.body.userId;
  const itemId = req.body.itemId;

  let update_query = `
    INSERT INTO Favorites(userId, itemId) VALUES(${userId}, ${itemId});
  `;

  try {
    let results = await sequelize.query(update_query, {
      type: sequelize.QueryTypes.UPDATE
    });
    res.status(200).send(JSON.stringify(results));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
}

exports.removeFavorite = async (req, res, next) => {
  const userId = req.body.userId;
  const itemId = req.body.itemId;

  let remove_query = `
    DELETE FROM Favorites WHERE userId=${userId} AND itemID=${itemId}
  `;

  try {
    let results = await sequelize.query(remove_query, {
      type: sequelize.QueryTypes.DELETE
    });
    res.status(200).send(JSON.stringify(results));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
}

exports.getFavoritesByUserId = async (req, res, next) => {
  const userId = req.query.userId;

  let get_query = `
    SELECT itemId FROM Favorites WHERE userId=${userId}
  `;

  try {
    let results = await sequelize.query(get_query, {
      type: sequelize.QueryTypes.SELECT
    });
    res.status(200).send(JSON.stringify(results.map(result => result.itemId)));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
}