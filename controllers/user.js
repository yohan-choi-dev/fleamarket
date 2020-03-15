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
};

const updateUserPassword = async (req, res, next) => {
  const userId = req.params.userId;
  const newPassword = req.body.newPassword;

  // Update user's email
  let query = `UPDATE Users SET password="${newPassword}" WHERE id=${userId};`;
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
};

const updateUserAddress = async (req, res, next) => {
  const userId = req.params.userId;
  const newApartmentNumber = req.params.newAppartmentNumber;
  const newBuildingNumber = req.params.newBuildingNumber;
  const newStreetNumber = req.params.newStreetNumber;
  const newStreetName = req.params.newStreetName;
  const newCity = req.params.newCity;
  const newProvince = req.params.newProvince;
  const newPostalCode = req.params.newPostalCode;
  const newCountry = req.params.newCountry;
  const newPhoneNumber = req.params.newPhoneNumber;

  const newAddress =
    newApartmentNumber +
    "" +
    newBuildingNumber +
    "" +
    newStreetNumber +
    "" +
    newStreetName +
    "" +
    newCity +
    "" +
    newProvince +
    "" +
    newPostalCode +
    "" +
    newCountry;

  // Update user's address
  let query = `UPDATE Users SET address="${newAddress}",phoneNumber="${newPhoneNumber}" WHERE id=${userId};`;
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
};

exports.getUserById = async (req, res, next) => {
  let userId = req.params.userId;
  let search_query = `SELECT name,email,address,paymentID 
                        FROM Users
                          WHERE id=${userId}`;
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
};

exports.updateAccountSettings = async (req, res, next) => {
  if (req.body.newEmail) {
    await updateUserEmail(req, res, next);
  }

  if (req.body.newPassword) {
    // Update user's password
    await updateUserPassword(req, res, next);
  }

  if (req.body.newAddress) {
    // Update user's address
    await updateUserAddress(res);
  }

  next();
};
