const User = require('../models/ussr')
const Item = require('../models/item')
const UserItemBridge = require('../model/UserItemBridge')

const TRADIN_STATUS_CODE = require('../variables/trading-status-code')
// Pseudo code
// Both users are in the same chatroom
// A user reqeusts trading
// Another user accpet it
// A user adds an Item

module.exports = (io, redis) => {
    const trading = io.of('/trading')
    trading.on('connection', async (socket) => {
        socket.on('trade.status', (status) => {
            switch (status) {
                case 
            }
        })
    })
}
