class Namespace {
    constructor(id, namespace, endpoint) {
        this.id = id
        this.namespace = namespace
        this.endpoint = endpoint
        this.rooms = []
    }

    addRoom(room) {
        this.rooms.push(room)
    }
}

module.exports = Namespace
