class Namespace {
    constructor(io, socket, path) {
        this.endpoint = `${path}/user=${socket.token}`
        this.namespace = io.of(this.endpoint)
        this.rooms = []
    }

    addRoom(room) {
        this.rooms.push(room)
    }
}

module.exports = Namespace
