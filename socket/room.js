class Room {
    constructor(id, namespace) {
        this.id = id
        this.namespace = namespace
        this.history = []
    }

    addMessage(message) {
        this.history.push(message)
    }

    clearHistory() {
        this.history = []
    }
}

module.exports = Room
