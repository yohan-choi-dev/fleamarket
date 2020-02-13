const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const cryptoRandomString = require('crypto-random-string');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const MailService = require('../service/mail-service');

const { User, Token } = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req)

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }

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

        const cryptoURL = cryptoRandomString({length: 48, type: 'url-safe'});

        const token = await Token.create({
            token: cryptoURL,
            UserId: user.id
        });

        MailService.sendMail(user.email, {
            subject: "Verfication Email",
            text: cryptoURL,
            html: `<a href='http://localhost:10017/confirmEmail?url=${cryptoURL}'>${cryptoURL}</a>`
        });

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

exports.confirmEmail = async (req, res, next) => {
    const url = req.query.url;

    try {
        const tokenUser= await Token.findOne({
            where: {
                token: url
            }
        });

        if(!tokenUser) {
            const error = new Error('No matching link found!');
            error.statusCode = 404;
            throw error;
        }

        const tokenDate = tokenUser.get().createAt;

        const expiredDate = moment(tokenDate).add(24, 'h');
        const currentDate = moment();

        if (currentDate > expiredDate) {
            await Token.destroy({
                where: {
                    id: token.id
                }
            });
            const error = new Error("Your token expired already!");
            error.statusCode = 404;
            throw error;
        }

        userId = token.get().UserId;

        const user = await User.update({isActivated: true}, {
            where: {
                id: userId
            }
        });

        res.status(200).json(user);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
