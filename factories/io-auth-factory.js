const socketAuth = require('socketio-auth')

// Whenever a user logs in the system, the system release token
// Then the token is stored on the redis

module.exports = (io, database) => {
    const ioAuthController = {}

    const socketAuthConfig = {}

    socketAuthConfig.authenticate = async (socket, data, callback) => {
        const { token } = data
        const verifyUser = async (token) => {
            return token
        }
        try {
            const user = await verifyUser(token)
            const isVerified = await database.setAsync(`users:${user.id}, ${socket.id}, 'NX', 'EX'`)

            if (!isVerified) {
            
            }
            socket.user = user
        } catch (error) {
            console.log(`Socket ${socket.id} unauthorized`)
            return callback({ message: `ALREADY_LOGGED_IN` })
        }
    }

    socketAuthConfig.postAuthenticate = async (socket) => {
        console.log(`Socket ${socket.id} authenticated`)

        socket.conn
    }
    socketAuthConfig.disconnect = async (socket) => {
        console.log(`Socket ${socket.id} disconnected.`)

        if (socket.user) {
            await database.delAsync(`users:${socket.user.id}`)
        }
    }

    socketAuth(io, socketAuthConfig)
}
