module.exports = (io, socket, sockets) => {
    for (let i in sockets) {
        socket.emit('user.add', {
            username: sockets[i].username,
            id: sockets[i]
        })

        socket.on('username.create', (data) => {
            socket.username = data
            socket[socket.id] = socket
            io.emit('user.add', {
                username: socket.username,
                id: socket.id
            })
        })

        socket.on('user.msg.send', (id, msg) => {
            sockets[id].emit('user.msg.sent', msg)
        })

        socket.on('disconnect', () => {
            delete sockets[socket.id]
            io.emit('user.remove', socket.id)
        })
    }
}
