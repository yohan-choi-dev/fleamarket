const { validationResult } = require('express-validator/check');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
       const errors = validationResult(req)

    try {
          if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
         }
        console.log(req.body);
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const hashedPw = await bcrypt.hash(password, 12);
        const result = await User.create({ email: email, name: name, password: hashedPw });
        const user = result.get();

        res.status(201).json({
            message: "Success!",
            email: user.email,
            name: user.name,
            updateAt: user.updateAt,
            createAt: user.createAt
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        let loadedUser = await User.findOne({
            where: {
                email: email
            }
        });
        if (loadedUser === null) {
            const error = new Error(`${email} does not exist!`);
            error.statusCode = 401;
            throw error;
        }
        const isMatch = await bcrypt.compare(password, loadedUser.password);
        if (!isMatch){
            const error = new Error('Invalid password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: loadedUser.email,
            id: loadedUser.id.toString()
        }, 'jsonscretoeknforfleamarket',
            { expiresIn: '1h' });
        res.status(200).json({token: token, id: loadedUser.id.toString()});
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

