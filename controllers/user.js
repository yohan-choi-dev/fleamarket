const sequelize = require("../utils/database");
const User = require("../models/user");

const updateUserEmail = async (req, res, next) => {
  const userId = req.params.userId;
  const newEmail = req.body.newEmail;

  // Update user's email
  let query = `UPDATE Users SET email="${newEmail}" WHERE id=${userId};`;
  try {
    let results = await sequelize.query(query, {
      type: sequelize.QueryTypes.UPDATE
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
}

exports.updateAccountSettings = async (req, res, next) => {
  if (req.body.newEmail) {
    await updateUserEmail(req, res, next);
  }

  if (req.body.newPassword) {
    // Update user's password
  }

  if (req.body.address) {
    // Update user's address
  }

  next();
}