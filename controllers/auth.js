const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/users');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        throw error;
    }
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            Users.create({ name: name, email: email, password: hashedPw })
                .then(user => {
                    return user;
                })
        })
        .then(user => {
            let message = "User Account has been created successfully!";
            res.status(201)
                .json({
                    message: message,
                    user: user.get({
                        plane: true
                    })
                })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    Users.findOne({
        where: { email: value }
    })
        .then(user => {
            if (user === null) {
                const error = new Error(email + ' does not exist!');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user.get({plane: true});
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Invalid password!');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({
                email: loadedUser.email,
                id: loadedUser.id.toString()
            }, 'jsonscrettokenforfleamarket', 
                { expiresIn: '1h'}
            );
            res.status(200).json({token: token, id: loadedUser.id.toString()});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

