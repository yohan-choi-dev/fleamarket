const { body, check } = require('express-validator/check');

const User = require('../models/user');


/*
check('email').isEmail(),
 14     check('password').isLength({min: 5})
 16     body('email')
 17     .isEmail()
 18     .withMessage('Please enter valid email address. Your email format is invalid')
 19     .custom((value, { req }) => {
 20         return User.findOne({
 21             attributes: email,
 22             where: { email: value }
 23         }).then(result => {
 24             if (result !== null) {
 25                 return Promise.reject('This email address already exist!');
 26             }
 27         });
 28     })
 29     .normalizeEmail(),
 30     body('password')
 31     .trim()
 32     .isLength({min: 8, max: 24}),
 33     body('name')
 34     .trim()
 35     .notEmpty()
 36
 */
module.exports = (req, res, next) => {

}

