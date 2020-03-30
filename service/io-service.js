const ioFactory = require('../factories/io-factory')
const messageController = require('./chatservice/message')

module.exports = (server, database) => {
    const io = ioFactory(server, database)
    const sockets = {}

    io.on('connection', (socket) => {
        for (let i in sockets) {
            socket.emit('user.add', {
                username: sockets[i].username,
                id: sockets[i].id
            })
        }

        socket.on('username.create', (data) => {
            socket.username = data
            sockets[socket.id] = socket
            io.emit('user.add', {
                username: socket.username,
                id: socket.id
            })
        })

        socket.on('user.hug', (id) => {
            sockets[id].emit('user.hugged', socket.username)
        })

        socket.on('disconnect', () => {
            delete sockets[socket.id]
            io.emit('user.remove', socket.id)
        })

        messageController(io, socket)
    })
}
