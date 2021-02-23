const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1]
    let docodedToken
    try {
        docodedToken = jwt.verify(token, 'jsonscrettokenforfleamarket')
    } catch (err) {
        err.statusCode = 500
        throw err
    }

    if (!docodedToken) {
        const error = new Error('Not authenticated access!')
        error.statusCode = 401
        throw error
    }

    req.userId = docodedToken.userId
    next()
}
