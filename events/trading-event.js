const crytpoRandomString = require('crypto-random-string')
const UserItemBridge = require('../models/user-item-bridge')
const Trade = require('../models/token')

module.exports = (io) => {
    const trade = io.of('/trade')
    trade.on('connection', (socket) => {
        try {
            socket.join(socket.handshake.query.id)
            console.log(socket.handshake.query.id)
        } catch (err) {
            socket.emit('error', err)
            console.error(err)
        }

        socket.on('user.request.trade', (user, item) => {
            console.log('user.request.trade')
            trade.to(user.id).broadcast.emit('user.request.trade.done', { user: user, item: item })
        })

        socket.on('user.request.trade.accepted', async (user) => {
            console.log('user.request.trade.accepted')
            try {
                const result = await Trade.create({
                    token: crytpoRandomString({ length: 20 }),
                    userA: socket.handshake.query.id,
                    userB: user.id
                })
                socket.emit('user.request.trade.accepted.done', result)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        // this will be used when a user clicks a confirm button
        //  so the user is waiting for another user's response.
        socket.on('user.request.confirm', (user) => {
            console.log('user.request.confirm')
            trade.to(socket.handshake.query.id).broadcast(user).emit('user.request.confirm.sent')
        })

        socket.on('user.confirm.trade', async (itemA, itemB) => {
            console.log('user.confirm.trade')
            try {
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
                trade.to(itemA.userId).emit('user.confirm.trade.done', [result1, result2])
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })
        socket.on('user.cancel.trade', async (tradeId) => {
            console.log('user.cancel.trade')
            try {
                const result = await Trade.delete({
                    where: {
                        id: tradeId
                    }
                })
                trade.to(socket.handshake.query.id).emit('user.cancel.trade.done', result)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })
    })
}
