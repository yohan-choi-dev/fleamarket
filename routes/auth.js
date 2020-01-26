const express = require('express');
const { body } = require('express-validator/check');

const Users = require('../models/users');
const authController = require('../controllers/auth');

const router = express.Router();

router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter valid email address. Your email format is invalid')
    .custom((value, { req }) => {
        return User.findOne({
            where: {email: value},
        }).then(result => {
            if (result !== null) {
                return Promise.reject('This email address already exist!');
            }
        });
    })
    .normalizeEmail(),
    body('password')
    .trim()
    .isLength({min: 8, max: 24}),
    body('name')
    .trim()
    .notEmpty()
], authController.singup
);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogin);


module.exports = router;
