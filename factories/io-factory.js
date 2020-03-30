const SocketIO = require('socket.io')
const adapter = require('socket.io-redis')
const socketEmmiter = require('socket.io-emitter')

module.exports = (server, db) => {
    const io = SocketIO()
    const dbAdapter = adapter(db.config)
    //const emmiter = socketEmmiter(db.config)

    io.attach(server)
    io.adapter(dbAdapter)
    //io.emmiter = emmiter

    return io
}
// io and io's connected socket will be integrate on service file
