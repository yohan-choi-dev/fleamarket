const socketAuth = require('socketio-auth')

module.exports = (io, database) => {
    const ioAuthController = {}

    const socketAuthConfig = {}

    socketAuthConfig.authenticate = async (socket, data, callback) => {
        const { token }
    }
    
    socketAuthConfig.postAuthenticate = async () => {}
    socketAuthConfig.disconnect = async () => {}

    socketAuth(io, socketAuthConfig)
}
