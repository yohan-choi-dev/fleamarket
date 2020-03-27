let io

module.exports = {
    init: (httpServer) => {
        io = require('socket.io')(httpServer)
    },
    getIO: () => {
        return io
    },
}
