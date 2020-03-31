const sequelize = require("../utils/database");
const Comment = require('../models/comment');

exports.getCommentsByItemId = async (req, res, next) => {
  const itemId = req.query.itemId;

  try {
    const search_query = `
      SELECT u.name as userName, u.description as userDescription, u.image as userImage, c.content as commentContent
      FROM Items i, Users u, Comments c
      WHERE i.id=${itemId} AND i.id = c.itemId AND u.id = c.userId;
    `;
    const results = await sequelize.query(search_query, {
      type: sequelize.QueryTypes.SELECT
    });
    res.status(201).json(results);

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.createComment = async (req, res, next) => {
  const itemId = req.body.itemId;
  const userId = req.body.userId;
  const content = req.body.content;

  try {
    const comments = await Comment.create({ itemId, userId, content });
    res.status(201).json(comments);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}