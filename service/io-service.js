const ioFactory = require('../factories/io-factory')
const chatEvent = require('../events/chat-event')

module.exports = (server, database) => {
    const io = ioFactory(server, database)
    const redis = database.getClient()

    io.on('connection', (socket) => {
        const userId = socket.handshake.query.id
        console.log(socket.handshake.query)
        console.log(userId)
        redis
            .hsetAsync(`{userdata:${userId}}`, 'status', 'online')
            .then((res) => console.log(res))
            .catch((err) => console.error(err))

        socket.on('disconnect', () => {
            redis
                .hsetAsync(`{userdata:${userId}}`, 'status', 'offline')
                .then((res) => console.log(res))
                .catch((err) => console.error(err))
        })
    })

    chatEvent(io, redis)
}
