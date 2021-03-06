const { validationResult } = require('express-validator')

const bcrypt = require('bcryptjs')
const cryptoRandomString = require('crypto-random-string')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const MailService = require('../service/mail-service')

const User = require('../models/user')
const Token = require('../models/token')

const ERROR_CODES = require('../utils/app-error-codes')
// const dotenv = require('dotnev')
// dote
const URL = process.env.URL
const CLIENT_URL = process.env.CLIENT_URL

exports.signup = async (req, res, next) => {
    const errors = validationResult(req)

    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!')
            error.statusCode = 422
            error.data = errors.array()
            error.data[0].appErrorCode = ERROR_CODES.USER.EMAIL_USED
            throw error
        }
        const email = req.body.email
        const name = req.body.name
        const password = req.body.password
        const description = req.body.description
        const image = req.files[0].path

        const hashedPw = await bcrypt.hash(password, 12)
        console.log('signup email', email);
        const result = await User.create({
            email: email,
            namespace: cryptoRandomString({ length: 24, type: 'url-safe' }),
            name: name,
            password: hashedPw,
            description: description,
            image: image
        })
        const user = result.get()

        const cryptoURL = cryptoRandomString({ length: 48, type: 'url-safe' })

        await Token.create({
            token: cryptoURL,
            UserId: user.id
        })

        res.status(201).json({
            message: 'Success!',
            email: user.email,
            name: user.name,
            updateAt: user.updateAt,
            createAt: user.createAt
        })

        const domain = `${URL}/api/auth/confirmEmail?url=`

        MailService.sendMail(user.email, {
            subject: 'Verfication Email',
            text: cryptoURL,
            html: `<a href='${domain}${cryptoURL}'>${domain}${cryptoURL}</a>`
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    try {
        let loadedUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (loadedUser === null) {
            const error = new Error(`${email} does not exist!`)
            error.statusCode = 401
            res.status(401).json({
                message: 'Email does not exist'
            })
            throw error
        } else if (!loadedUser.isActivated) {
            const error = new Error(`User account ${email} is not activated!`)
            error.statusCode = 403
            res.status(401).json({
                message: 'User account is not activated!'
            })
            throw error
        }

        const isMatch = await bcrypt.compare(password, loadedUser.password)

        if (!isMatch) {
            const error = new Error('Invalid password!')
            error.statusCode = 401
            res.status(401).json({
                message: 'Invalid password!'
            })
            throw error
        }

        const token = jwt.sign(
            {
                email: loadedUser.email,
                id: loadedUser.id.toString()
            },
            'jsonscretoeknforfleamarket',
            { expiresIn: '1h' }
        )

        res.status(200).json({
            token: token,
            id: loadedUser.id,
            name: loadedUser.name,
            description: loadedUser.description,
            image: loadedUser.image,
            liked: loadedUser.liked,
            disliked: loadedUser.disliked,
            email: loadedUser.email
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        console.error(error)
    }
}

exports.confirmEmail = async (req, res, next) => {
    const url = req.query.url

    try {
        const tokenUser = await Token.findOne({
            where: {
                token: url
            }
        })

        if (!tokenUser) {
            const error = new Error('No matching link found!')
            error.statusCode = 404
            throw error
        }

        const tokenDate = tokenUser.get().createdAt
        const expiredDate = moment(tokenDate).add(24, 'h').toDate()
        const currentDate = moment().toDate()

        if (currentDate > expiredDate) {
            await Token.destroy({
                where: {
                    token: url
                }
            })
            const error = new Error('Your token expired already!')
            error.statusCode = 404
            throw error
        }

        const userId = tokenUser.get().UserId

        const user = await User.update(
            { isActivated: true },
            {
                where: {
                    id: userId
                }
            }
        )

        res.status(200).redirect(CLIENT_URL)

        res.status(200).json(user)
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}

exports.recoverAccount = async (req, res, next) => {
    const email = req.body.email

    try {
        let loadedUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (loadedUser === null) {
            const error = new Error(`${email} does not exist!`)
            error.statusCode = 401
            throw error
        } else if (!loadedUser.isActivated) {
            const error = new Error(`User account ${email} is not activated!`)
            error.statusCode = 403
            throw error
        }

        const cryptoURL = cryptoRandomString({ length: 48, type: 'url-safe' })

        await Token.create({
            token: cryptoURL,
            UserId: loadedUser.id
        })

        const resetUrl = `http://myvmlab.senecacollege.ca:6761/reset-password?userId=${loadedUser.id}&token=${cryptoURL}`

        MailService.sendMail(loadedUser.email, {
            subject: 'FleaMarket - Recover your account',
            text: resetUrl,
            html: `<a href='${resetUrl}'>Reset your password here</a>`
        })

        res.status(200).json({
            message: 'Successfully sent email to recover account!'
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error)
    }
}
