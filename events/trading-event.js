const crytpoRandomString = require('crypto-random-string')
const UserItemBridge = require('../models/user-item-bridge')
const Trade = require('../models/trade')
const Item = require('../models/item')
const User = require('../models/user')

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
            trade.to(showTo).emit('select.item.done', socket.handshake.query.id, item)
        })

        socket.on('user.request.trade.sent', async (userA, userB, itemA, itemB) => {
            try {
                console.log('user.request.trade')
                console.log('user.request.trade')
                console.log(userA)
                console.log(userB)
                console.log(itemA)
                console.log(itemB)

                const result = await Trade.create({
                    token: crytpoRandomString({ length: 20 }),
                    userA: userA.id,
                    userB: userB.id,
                    itemA: itemA.id,
                    itemB: itemB.id
                })
                trade.to(userA.id).emit('status', TRADE.REQUEST_SENT_DONE)
                trade.to(userA.id).emit('user.request.trade.sent.done', {
                    user: socket.handshake.query.id,
                    item: itemA,
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

                await Item.update(
                    { hidden: true },
                    {
                        where: {
                            id: itemB.id
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

                await Item.update(
                    { hidden: true },
                    {
                        where: {
                            id: itemA.id
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

        socket.on('rate.user', async (user, rate) => {
            console.log('rate.user')
            try {
                const user = await User.find({
                    where: {
                        id: user.id
                    }
                })
                const totalRate = await user.get().totalRate
                const numTrade = await user.get().numTrade
                if (!rate && !totalRate) {
                    await user.update({
                        totalRate: totalRate + rate
                    })
                    await user.update({
                        numTrade: numTrade + 1
                    })
                }
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })
    })
}
