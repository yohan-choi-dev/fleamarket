const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string");

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

const updateUserPassword = async (req, res, next) => {
  const userId = req.params.userId;
  const token = req.body.token;
  const newPassword = req.body.newPassword;
  const encryptedNewPassword = await bcrypt.hash(newPassword, 12);

  let checkUserQuery = `SELECT token FROM Tokens WHERE userId=${userId}`;

  try {
    let results = await sequelize.query(checkUserQuery, {
      type: sequelize.QueryTypes.SELECT
    });
    if (results.length === 0) {
      const error = new Error("No Search Result");
      error.statusCode = 401;
      throw error;
    }

    const latestToken = results[results.length - 1].token;

    if (latestToken == token) {
      let query = `UPDATE Users SET password="${encryptedNewPassword}" WHERE id=${userId};`;

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
    } else {
      res.status(200).send(JSON.stringify({
        message: "No token found for user."
      }));
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.updateAccountSettings = async (req, res, next) => {
  if (req.body.newEmail) {
    // update user's email
    await updateUserEmail(req, res, next);
  }

  if (req.body.newPassword) {
    // Update user's password
    await updateUserPassword(req, res, next);
  }

  if (req.body.address) {
    // Update user's address
  }

  next();
}