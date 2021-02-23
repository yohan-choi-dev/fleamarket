const cryptoRandomString = require('crypto-random-string')

exports.getRandomString = () => {
    return cryptoRandomString({ length: 48, type: 'url-safe' })
}
