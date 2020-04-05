const MESSAGE_STATUS_CODE = require('../variables/message-status-code')
module.exports = (io, redis) => {
    const chat = io.of('/chat')
    chat.on('connection', (socket) => {
        try {
            // by default, every user has thier personal chatroom
            // when they log in the system
            // They joinned the thier room automatically
            socket.join(socket.handshake.query.id)
            console.log(socket.handshake.query)
        } catch (err) {
            socket.emit('error', err)
            console.error(err)
        }

        socket.on('chat.get.list', async () => {
            try {
                const userIds = await redis.smembersAsync(`connection=${socket.handshake.query.id}`)
                if (Array.isArray(userIds)) {
                    userIds.forEach((userId) => {
                        socket.join(userId)
                        console.log(`${socket.handshake.query.id} is connected to ${userId}`)
                    })
                    socket.emit('chat.get.list.done', userIds)
                } else {
                    socket.join(userIds)
                    console.log(`${socket.handshake.query.id} is connected to ${userIds}`)
                    socket.emit('chat.get.list.done', userIds)
                }
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('leave', async (user) => {
            console.log(`user ${user.id} left`)
            try {
                socket.leave(user.id)
                await redis.sremAsync(`connection=${socket.handshake.query.id}`, user.id)
                await redis.sremAsync(`connection=${user.id}`, socket.handshake.query.id)
                socket.emit('leave.done', user)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        // When a user joins another usur, the target user is also added to connection
        socket.on('join', async (user) => {
            try {
                socket.join(user.id)
                await redis.saddAsync(`connection=${socket.handshake.query.id}`, user.id)
                await redis.saddAsync(`connection=${user.id}`, socket.handshake.query.id)
                socket.emit('join.done', user)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('message.update', async (data) => {
            console.log('message.update: ', data)
            console.log(socket.handshake.query.id)
            try {
                await redis.lpushAsync(
                    `conversation=${socket.handshake.query.id}&${data.user.id}`,
                    JSON.stringify(data)
                )
                await redis.lpushAsync(
                    `conversation=${data.user.id}&${socket.handshake.query.id}`,
                    JSON.stringify(data)
                )
                chat.to(data.user.id).emit('message.update.done', data)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('message.index', async (data) => {
            try {
                const messageIndex = await redis.lindexAsync(
                    `conversation=${socket.handshake.query.id}&${data.user.id}`,
                    data.message
                )
                socket.emit('message.index.done', messageIndex)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('message.delete', async (data) => {
            try {
                await redis.lremAsync(
                    `conversation=${socket.handshake.query.id}&${data.user.id}`,
                    data.message
                )
                socket.emit('message.delete.done', MESSAGE_STATUS_CODE.OPERATION_SUCCESS)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('message.load', async (user, rangeFrom, rangeBy) => {
            try {
                // for the total number of messages
                await redis.llenAsync(`conversation=${socket.handshake.query.id}&${user.id}`)
                const data = await redis.lrangeAsync(
                    `conversation=${socket.handshake.query.id}&${user.id}`,
                    rangeFrom,
                    rangeBy
                )
                // a user should see only their mesage lines.
                const result = {
                    userId: user.id,
                    messages: data.reverse().map((record) => JSON.parse(record))
                }
                socket.emit('message.load.done', result)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })
    })
}
