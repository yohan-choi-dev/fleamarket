const express = require('express');
const { body, check } = require('express-validator');

const { User, Token } = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', (req,res,next) => {
    next();
}, [
    check('email')
    .normalizeEmail()
    .isEmail()
    .bail()
    .custom(value => {
        return User.findAll({
            attributes: ['email'],
            where: { email: value }
        })
            .then(user => {
                let lenth = user.length;
                if (lenth !== 0) {
                    let error = new Error('Email is in use already')
                    error.statusCode = 401;
                    return Promise.reject(error);
                }
            })
    })
    .bail(),
    check('password')
    .isLength({min: 8, max: 25})
    .withMessage('must be at least 8 chars long and at most 25 chars long')
], authController.signup);

router.post('/login', authController.login);

router.get('/confirmEmail', authController.confirmEmail);

module.exports = router;
