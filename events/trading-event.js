const crytpoRandomString = require('crypto-random-string')
const User = require('../models/ussr')
const Item = require('../models/item')
const UserItemBridge = require('../model/UserItemBridge')
const Trade = require('../models/token')

const STATUS = require('../variables/trading-status-code')

/*
 Pseudo Code

James is in the chatroom with Alex
James chooses an item to exchange
James clicks Trade with Alex button
Alex clicks confirm trade button
Alex clicks cancels trade button
James clicks complete trade button



Once Trade has been completed, then a user can give start

*/
module.exports = (io) => {
    const trading = io.of('/trading')
    trading.on('connection', (socket) => {
        try {
            socket.join(socket.handshake.query.id)
            console.log(socket.handshake.query.id)
        } catch (err) {
            socket.emit('error', err)
            console.error(err)
        }

        socket.on('trade.request.trade', (user, item) => {
            socket.to(user.id).broadcast.emit('trade.request.sent', { user: user, item: item })
        })

        socket.on('trade.request.accept', async (user) => {
            const result = await Trade.create({
                token: crytpoRandomString({ length: 20 }),
                userA: socket.handshake.query.id,
                userB: user.id
            })
            socket.emit('trade.initialize.trading', result)
        })

        socket.on('trade.confirm.trading', async (itemA, itemB) => {
            const result1 = await UserItemBridge.update(
                { userId: itemA.userId },
                {
                    where: {
                        itemId: itemB.id
                    }
                }
            )
            const result2 = await UserItemBridge.update(
                { userId: itemB.userId },
                {
                    where: {
                        itemId: itemA.id
                    }
                }
            )

            io.to(itemA.userId).emit([result1, result2])
        })
        socket.on('trade.request.cancel', async (tradeId) => {
            const result = await Trade.delete({
                where: {
                    id: tradeId
                }
            })
            io.to(socket.handshake.query.id).on('trade.request.cancel.done', result)
        })
    })
}
