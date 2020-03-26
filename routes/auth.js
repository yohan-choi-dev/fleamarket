const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const Token = require('../models/token');
const authController = require('../controllers/auth');
const { storageMiddleware } = require('../middlewares/storage');

const router = express.Router();

router.post('/signup',
    [
        storageMiddleware,
        body('email')
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
            .bail()
        ,
        body('password')
            .isLength({ min: 8 })
            .withMessage('must be at least 8 chars long and at most 25 chars long')
    ], authController.signup);

router.post('/login', authController.login);

router.get('/confirmEmail', authController.confirmEmail);

router.post('/recover-account', authController.recoverAccount);

module.exports = router;
