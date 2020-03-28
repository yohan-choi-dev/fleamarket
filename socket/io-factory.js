const io = require('socket.io')()
const _ = require('lodash')

// const ss = require('socket.io-stream')
// const redisAdapter = require('socket.io-redis')

module.exports = {
    init: _.once((server) => {
        io.attach(server)
        //io.adapter(redisAdapter({ host: 'localhost', port: server.address().port }))
    }),
    getIO: () => {
        return io
    }
}
