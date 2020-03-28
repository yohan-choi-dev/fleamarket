const io = require('socket.io')()
//const ss = require('socket.io-stream')
const socketAuth = require('socketio-auth')
const adapter = require('socket.io-redis')
const _ = require('lodash')

module.exports = _.once((server, dbService) => {
    const ioService = {}

    ioService.init = () => {
        io.attach(server)

        io.on('connection', (socket) => {
            const addUser = (socket) => {}
        })

        io.on('disconnection', (socket) => {
            const deleteUser = () => {}
        })
    }

    ioService.getIO = () => {
        return io
    }

    return ioService
})
