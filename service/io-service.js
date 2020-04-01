const ioFactory = require('../factories/io-factory')
const chatEvent = require('../events/chat-event')

module.exports = (server, database) => {
    const io = ioFactory(server, database)
    const redis = database.getClient()

    io.on('connection', async (socket) => {
        const userId = socket.handshake.query.id
        try {
            await redis.hsetAsync(`users:${userId}`, 'status', 'online')
        } catch (err) {
            socket.emit('error', err)
            console.error(err)
        }

        socket.on('disconnect', async () => {
            try {
                await redis.hsetAsync(`users:${userId}`, 'status', 'offline')
                console.log(`${userId} disconnected`)
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
}
