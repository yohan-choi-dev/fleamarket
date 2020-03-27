const namespaces = require('./namespace')

let io
let client

module.exports = {
    init: (httpServer, redis) => {
        io = require('socket.io')(httpServer)

        io.on('connection', (socket) => {
            let namespaceList = namespaces.map((namespace) => {
                return {
                    endpoint: namespace.endpoint
                }
            })

            socket.emit('namespaceList', namespaceList)
        })
        client = redis.getClient()
        client.hmsetAsync()
    },
    getIO: () => {
        return io
    }
}
