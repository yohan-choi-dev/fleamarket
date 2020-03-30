module.exports = (io, socket) => {
    console.log(`socket.id = ${socket.id}`)
    console.log('message controller works fine')
    socket.on('message.send', (data) => {
        console.log('message is comming')
        socket.broadcast.emit('message.sent', data)
        //io.emit('message.sent', data)
    })
}
