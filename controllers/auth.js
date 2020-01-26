const { validationResult } = require('express=validator/check');
const bcrypt = require('bcryptjs');

const Users = require('../model/users');


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

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    }
};



exports.postLogin = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        // this part will be filled later
        connection.query('');

    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
    res.redirect('/');
}
