const crytpoRandomString = require('crypto-random-string')
const UserItemBridge = require('../models/user-item-bridge')
const Trade = require('../models/trade')

const TRADE = Object.freeze({
    DEFAULT: 0,
    REQUEST_SENT_DONE: 1,
    REQUEST_ACCPTED_DONE: 2,
    REQUEST_CONFIRM_SENT: 3,
    CONFIRM_TRADE: 4,
    CANCEL_TRADE: 5,
    COMPLETE_TRADE: 6
})

module.exports = (io) => {
    const trade = io.of('/trade')

    trade.on('connection', (socket) => {
        try {
            socket.join(socket.handshake.query.id)
            console.log(`user joined ${socket.handshake.query.id}`)
        } catch (err) {
            socket.emit('error', err)
            console.error(err)
        }

        socket.on('select.item', (showTo, item) => {
            trade.to(showTo).emit(showTo, item)
        })

        socket.on('user.request.trade.sent', async (user, item) => {
            try {
                console.log('user.request.trade')
                console.log(user)
                console.log(item)

                const result = await Trade.create({
                    token: crytpoRandomString({ length: 20 }),
                    userA: socket.handshake.query.id,
                    userB: user.id
                })
                trade.to(user.id).emit('status', TRADE.REQUEST_SENT_DONE)
                trade.to(user.id).emit('user.request.trade.sent.done', {
                    user: socket.handshake.query.id,
                    item: item,
                    room: result.get().token
                })
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('user.request.trade.accepted', (user) => {
            console.log('user.request.trade.accepted')
            console.log(user)
            try {
                trade.to(user.id).emit('status', TRADE.REQUEST_ACCPTED_DONE)
                trade.to(user.id).emit('user.request.trade.accepted.done', user)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        // this will be used when a user clicks a confirm button
        //  so the user is waiting for another user's response.
        socket.on('user.request.confirm', (user) => {
            console.log('user.request.confirm')
            console.log(user)
            trade.to(user.id).emit('status', TRADE.REQUEST_CONFIRM_SENT)
            trade.to(socket.handshake.query.id).emit('user.request.confirm.sent')
        })

        socket.on('user.confirm.trade', async (itemA, itemB) => {
            console.log('user.confirm.trade')
            console.log(itemA)
            console.log(itemB)
            try {
                const result1 = await UserItemBridge.update(
                    { UserId: itemA.userId },
                    {
                        where: {
                            ItemId: itemB.id
                        }
                    }
                )

                const result2 = await UserItemBridge.update(
                    { UserId: itemB.userId },
                    {
                        where: {
                            ItemId: itemA.id
                        }
                    }
                )

                console.log(result1)
                console.log(result2)
                trade.to(itemA.userId).emit('status', TRADE.COMPLETE_TRADE)
                trade.to(itemA.userId).emit('status', TRADE.COMPLETE_TRADE)


                trade.to(itemA.userId).emit('user.confirm.trade.done', [result1, result2])
                trade.to(itemB.userId).emit('user.confirm.trade.done', [result1, result2])
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })
        socket.on('user.cancel.trade', async (tradeId) => {
            console.log('user.cancel.trade')
            try {
                const result = await Trade.destroy({
                    where: {
                        id: tradeId
                    }
                })
                console.log(result)
                trade
                    .to(socket.handshake.query.id)
                    .emit('user.cancel.trade.done', 'cancelled request')
                trade.to(result.get().userA.id).emit('status', TRADE.CANCEL_TRADE)
                trade.to(result.get().userB.id).emit('status', TRADE.CANCEL_TRADE)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })
    })
}
