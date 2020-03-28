// db module example

const level = require('level')
const sublevel = require('level-sublevel')
module.exports = sublevel(level('example-db', { valueEncoding: 'json' }))


// the authService Module
const db = require('./db')
const users = db.sublevel('users')
const tokenSecret = 'SHHH!'

exports.login = (username, password, callback) => {
    users.get(username, function (err, user) {
        // ...
    })
}
exports.checkToken = (token, callback) => {
    // ...
    users.get(userData.username, function (err, user) {
        // ...
    })
}

const authService = require('./authService')
exports.login = (req, res, next) => {
    authService.login(req.body.username, req.body.password, (err, result) => {
        // ...
    })
}
exports.checkToken = (req, res, next) => {
    authService.checkToken(req.query.token, (err, result) => {})
}

// DI pattern

module.exports = (dbName) => {
    return sublevel(level(dbName, { valueEncoding: 'json' }))
}


module.exports = (db, tokenSecret) => {
    const users = db.sublevel('users')
    const authService = {}

    authService.login = (username, password, callback) => {
        ///
    }

    authService.checkToken = (token, callback) => {}

    return authService
}

module.exports = (authService) => {
    const authController = {}

    authController.login = (req,res, next) => {

    }

    authController.checkToken = (req, res, next) => {

    }
    return authController
}

// This is high level component
// less resuable

// Firstly, we load  the factories of ouer service
// at this point, they are still stateless
const dbFactory = require('./lib/db')
const authServiceFactory = require('./lib/authService')
const authControllerFactory = require('./lib/authController')

// Next, we instantiate each service by providing the dependencies it requires.
// This is the phase where all the members are created and wired

const db = dbFactory('example-db')
const authService = authServiceFactory(db, 'SHHH!')
const authController = authControllerFactory(authService)

// Finaally, we register the routes of the authController module with the express
// server as we would normally do
