const socketAuth = require('socketio-auth')

// Whenever a user logs in the system, the system release token
// Then the token is stored on the redis

module.exports = (io, database) => {
    const socketAuthConfig = {}

    socketAuthConfig.authenticate = async (socket, data, callback) => {}
    socketAuthConfig.postAuthenticate = async (socket) => {}
    socketAuthConfig.disconnect = async (socket) => {}

    socketAuth(io, socketAuthConfig)
}
