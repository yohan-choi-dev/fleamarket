module.exports = (io, redis) => {
    const chat = io.of('/chat')
    chat.on('connection', async (socket) => {
        console.log(socket.handshake.query)
        let rooms = [1, 2, 3]
        rooms.forEach(console.log)
        console.log(Array.isArray(rooms))
        try {
            rooms = await redis.smembers(`rooms:${socket.handshake.query.id}`)
            console.log(Array.isArray(rooms))
            console.log(rooms)

            //rooms.forEach((room) => socket.join(room))

            socket.on('leave', (room) => {
                socket.leave(room)
                redis.srem(`rooms:${socket.handshake.query.id}`)
            })
        } catch (err) {
            console.error(err)
        }

        socket.binary(true).emit('welcome', 'welcome')
        socket.on('message.send', (data) => {
            chat.emit('message.sent', data)
        })
    })
}
