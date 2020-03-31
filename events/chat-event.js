module.exports = (io, redis) => {
    const chat = io.of('/chat')
    chat.on('connection', async (socket) => {
        let rooms = []
        rooms.forEach(console.log)

        try {
            rooms = await redis.smembers(`rooms:${socket.handshake.query.id}`)

            if (Array.isArray(rooms)) {
                rooms.forEach((room) => socket.join(room))
            }

            socket.on('leave', (room) => {
                socket.leave(room)
                redis.srem(`rooms:${socket.handshake.query.id}`)
            })

            socket.on('join', (room) => {
                socket.join(room)
                redis.sadd(`rooms:${socket.handshake.query.id}`, room)
            })
        } catch (err) {
            console.error(err)
        }
    })
}
