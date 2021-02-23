const ioFactory = require('../factories/io-factory')
const chatEvent = require('../events/chat-event')
const tradeEvent = require('../events/trading-event')

module.exports = (server, database) => {
    const io = ioFactory(server, database)
    const redis = database.getClient()

    io.on('connection', async (socket) => {
        const userId = socket.handshake.query.id
        try {
            await redis.hsetAsync(`users:${userId}`, 'status', 'online')
            io.emit('user-connected', userId)
        } catch (err) {
            socket.emit('error', err)
            console.error(err)
        }

        socket.on('disconnect', async () => {
            const userId = socket.handshake.query.id
            try {
                await redis.hsetAsync(`users:${userId}`, 'status', 'offline')
                console.log(`${userId} disconnected`)
                io.emit('user-disconnected', userId)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })

        socket.on('user.getStatus', async (user) => {
            try {
                const status = await redis.hgetAsync(`users:${user.id}`, 'status')
                socket.emit('user.getStatus.done', user.id, status)
            } catch (err) {
                socket.emit('error', err)
                console.error(err)
            }
        })
    })

    chatEvent(io, redis)
    tradeEvent(io)
}
