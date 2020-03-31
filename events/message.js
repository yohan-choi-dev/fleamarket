module.exports = (io, socket) => {
    socket.on('message.send', (data) => {
        socket.broadcast.emit('message.sent', data)
    })
}
