const MESSAGE_STATUS_CODE = require('../variables/message-status-code')
module.exports = (io, redis) => {
    const chat = io.of('/chat')
    chat.on('connection', async (socket) => {
        let users = []

        try {
            // by default, every user has thier personal chatroom
            // when they log in the system
            // They joinned the thier room automatically
            socket.join(socket.handshake.user.id)

            users = await redis.smembersAsync(`users:${socket.handshake.query.id}`)

            if (Array.isArray(users)) {
                users.forEach((user) => socket.join(user))
            }
        } catch (err) {
            socket.emit('error', err)
            console.error(err)
        }

        socket.on('leave', async (user) => {
            try {
                socket.leave(user)
                await redis.sremAsync(`connection:${socket.handshake.query.id}`, user.id)
                await redis.sremAsync(`connection:${user.id}`, socket.handshake.query.id)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        // When a user joins another usur, the target user is also added to connection
        socket.on('join', async (user) => {
            try {
                socket.join(user)
                await redis.saddAsync(`connection:${socket.handshake.query.id}`, user.id)
                await redis.saddAsync(`connection:${user.id}`, socket.handshake.query.id)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('message.update', async (user, message) => {
            try {
                await redis.lpushAsync(
                    `conversation:${socket.handshake.query.id}:${user.id}`,
                    message
                )
                await redis.lpushAsync(
                    `conversation:${user.id}:${socket.handshake.query.id}`,
                    message
                )
                chat.to(user).emit('message.update.done', message)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('message.index', async (user, message) => {
            try {
                const messageIndex = await redis.lindexAsync(
                    `conversation:${socket.handshake.query.id}:${user.id}`,
                    message
                )
                socket.emit('message.index.done', messageIndex)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('message.delete', async (user, message) => {
            try {
                await redis.lremAsync(
                    `conversation:${socket.handshake.query.id}:${user.id}`,
                    message
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
                await redis.llenAsync(`conversation:${socket.handshake.query.id}:${user.id}`)
                const messages = await redis.rangeAsync(
                    `conversation:${socket.handshake.query.id}:${user.id}`,
                    rangeFrom,
                    rangeBy
                )
                // a user should see only their mesage lines.
                socket.emit('message.load.done', messages)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })
    })
}
