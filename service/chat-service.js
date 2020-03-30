const User = require('../models/user')
const Item = require('../models/item')
const Chatroom = require('../models/chatroom')

class ChatService {
    constructor(io, database, namespace, rooms) {
        this.io = io
        this.database = database
        this.namespace = namespace
        this.rooms = rooms
    }

    async createChatroom() {}

    async leavingRoom() {}

    async deleteChatroom() {}

    async joinRoom() {}

    async addUser() {}

    async checkUser() {}

    async deleteUser() {}
}

