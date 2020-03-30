const Namespace = require('./namespace')

module.exports = (io, socket, path) => {
    const child = new Namespace(io, socket, path)
    child.namespace.on('connection', (childSocket) => {
        socket.emit('namespace.created', child.endpoint)

        
    })
}
