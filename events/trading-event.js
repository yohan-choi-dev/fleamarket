const User = require('../models/ussr')
const Item = require('../models/item')
const UserItemBridge = require('../model/UserItemBridge')
const Trade = require('../models/token')

const STATUS = require('../variables/trading-status-code')
// Pseudo code
// Both users are in the same chatroom
// A user reqeusts trading
// Another user accpet it
// A user adds an Item

module.exports = (io, redis) => {
    const trading = io.of('/trading')
    trading.on('connection', async (socket) => {
        socket.on('trade.request.trade', (user) => {})
        socket.on('trade.request.accept', (data) => {})
        socket.on('trade.request.confirm', (data) => {})
        socket.on('trade.request.cancel', (data) => {})
    })
}
