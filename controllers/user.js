const bcrypt = require('bcryptjs')
const cryptoRandomString = require('crypto-random-string')

const sequelize = require('../utils/database')
// const Token = require('../models/token')
const MailService = require('../service/mail-service')

const updateUserEmail = (req, res, next) => {
    // const userId = req.params.userId
    const newEmail = req.body.newEmail

    try {
        const tokenString = cryptoRandomString({ length: 48, type: 'url-safe' })
        // const token = await Token.create({
        //     token: tokenString,
        //     UserId: userId
        // })

        const domain = `http://myvmlab.senecacollege.ca:6761/api/users/confirm-email-update?newEmail=${newEmail}&token=${tokenString}`

        MailService.sendMail(newEmail, {
            subject: 'Email update confirmation',
            text: tokenString,
            html: `
      <p>
        Please click <a href="${domain}">this link</a> to confirm that you would like to update your email.
      </p>
    `
        })

        res.status(201).json({
            message: 'Success!'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

const updateUserAddress = async (req, res, next) => {
    const userId = req.params.userId
    const newApartmentNumber = req.body.newAddress.newApartmentNumber
    const newBuildingNumber = req.body.newAddress.newBuildingNumber
    const newStreetNumber = req.body.newAddress.newStreetNumber
    const newStreetName = req.body.newAddress.newStreetName
    const newCity = req.body.newAddress.newCity
    const newProvince = req.body.newAddress.newProvince
    const newPostalCode = req.body.newAddress.newPostalCode
    const newCountry = req.body.newAddress.newCountry

    let search_query = `
    SELECT a.id, a.aptNumber, a.buildingNumber, a.streetNumber, a.streetName, a.city, a.province, a.postalCode, a.country
    FROM Users u, Addresses a
    WHERE u.id=${userId} AND u.addressId=a.id;
  `

    let results = await sequelize.query(search_query, {
        type: sequelize.QueryTypes.SELECT
    })
    let address = results[0]

    let updateAptNumber = newApartmentNumber
        ? `aptNumber=${newApartmentNumber}`
        : `aptNumber=${address.aptNumber}`
    let updateBuildingNumber = newBuildingNumber
        ? `buildingNumber=${newBuildingNumber}`
        : `buildingNumber=${address.buildingNumber}`
    let updateStreetNumber = newStreetNumber
        ? `streetNumber=${newStreetNumber}`
        : `streetNumber=${address.streetNumber}`
    let updateStreetName = newStreetName
        ? `streetName='${newStreetName}'`
        : `streetName='${address.streetName}'`
    let updateCity = newCity ? `city='${newCity}'` : `city='${address.city}'`
    let updateProvince = newProvince
        ? `province='${newProvince}'`
        : `province='${address.province}'`
    let updatePostalCode = newPostalCode
        ? `postalCode='${newPostalCode}'`
        : `postalCode='${address.postalCode}'`
    let updateCountry = newCountry ? `country='${newCountry}'` : `country='${address.country}'`

    // Update user's address
    let query = `
    UPDATE Addresses 
    SET  ${updateAptNumber}, ${updateBuildingNumber},
         ${updateStreetNumber}, ${updateStreetName},
         ${updateCity}, ${updateProvince}, ${updatePostalCode}, ${updateCountry}
    WHERE id=${address.id};
  `

    try {
        let results = await sequelize.query(query, {
            type: sequelize.QueryTypes.UPDATE
        })

        res.status(200).send(JSON.stringify(results))
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

const updateUserPassword = async (req, res, next) => {
    const userId = req.params.userId
    const currentPassword = req.body.currentPassword
    const newPassword = req.body.newPassword

    let search_query = `SELECT * FROM Users WHERE id=${userId};`
    let results = await sequelize.query(search_query, {
        type: sequelize.QueryTypes.SELECT
    })
    const user = results[0]

    const isMatch = await bcrypt.compare(currentPassword, user.password)

    if (!isMatch) {
        res.status(401).json({
            message: 'Current password is not correct!'
        })
    } else {
        const encryptedNewPassword = await bcrypt.hash(newPassword, 12)
        try {
            let query = `UPDATE Users SET password="${encryptedNewPassword}" WHERE id=${userId};`

            let results = await sequelize.query(query, {
                type: sequelize.QueryTypes.UPDATE
            })

            res.status(200).send(JSON.stringify(results))
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        }
    }
}

exports.getUserById = async (req, res, next) => {
    let userId = req.params.userId
    let search_query = `
    SELECT id, name, description, email, image, liked, disliked
    FROM Users
    WHERE id=${userId};
  `
    try {
        let results = await sequelize.query(search_query, {
            type: sequelize.QueryTypes.SELECT
        })

        res.status(200).send(JSON.stringify(results[0]))
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.updateAccountSettings = async (req, res, next) => {
    if (req.body.newEmail) {
        // update user's email
        await updateUserEmail(req, res, next)
    }

    if (req.body.newPassword) {
        // Update user's password
        await updateUserPassword(req, res, next)
    }

    if (req.body.newAddress) {
        // Update user's address
        await updateUserAddress(req, res, next)
    }

    next()
}

exports.confirmEmailUpdate = async (req, res, next) => {
    const newEmail = req.query.newEmail
    const token = req.query.token

    // Find user id from token
    let user_query = `SELECT UserId FROM Tokens WHERE token='${token}' ORDER BY UserId DESC LIMIT 1`
    let user = await sequelize.query(user_query, {
        type: sequelize.QueryTypes.SELECT
    })
    user = user[0]

    // Update user's email
    let query = `UPDATE Users SET email='${newEmail}' WHERE id=${user.UserId};`
    try {
        let results = await sequelize.query(query, {
            type: sequelize.QueryTypes.UPDATE
        })
        if (results.length === 0) {
            const error = new Error('No Search Result')
            error.statusCode = 401
            throw error
        }
        res.status(200).send(`
      <p>Thank you! You have successfully updated your email!</p>
      <p>You can now log in with your new email <a href="http://myvmlab.senecacollege.ca:6761/">here</a></p>
    `)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.updateUserProfile = async (req, res, next) => {
    const userId = req.params.userId
    const newName = req.body.newName
    const newDescription = req.body.newDescription
    const newProfileImage = req.files

    const setNewName = `name='${newName}'`
    const setNewDescription = `description='${newDescription}'`
    let setNewProfilePhoto = ''
    if (newProfileImage.length > 0) {
        setNewProfilePhoto = `,image='${newProfileImage[0].path}'`
    }

    let search_query = `
        UPDATE Users
        SET ${setNewName}, ${setNewDescription} ${setNewProfilePhoto}
        WHERE id=${userId}
    `
    try {
        let results = await sequelize.query(search_query, {
            type: sequelize.QueryTypes.UPDATE
        })

        res.status(200).send(results[0])
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
