const io = require('socket.io')()
const adapter = require('socket.io-redis')
const _ = require('lodash')

module.exports = (server, db) => {
    const socketIO = {}
    const dbAdapter = adapter(db.config)

    socketIO.init = _.once(() => {
        io.attach(server)
        io.adapter(dbAdapter)
    })

    socketIO.getIo = () => {
        return io
    }

    return socketIO
}
