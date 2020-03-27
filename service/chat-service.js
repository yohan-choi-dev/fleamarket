const { promisify } = require('util')

const io = require('../socket/socket')
const redis = require('../utils/redis')

const User = require('../models/user')
const Item = require('../models/item')
const Chatroom = require('../models/chatroom')

// Event Driven Programming (For Event Listener) + Functional programming (For data flows)

class ChatService {
    // this consturctor should be change later but for the convience of seeing type of variables, I will init with a local variables
    constructor(io, namespace, rooms) {
        this.io = io
        this.redis = redis
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

/*
Chatting applciation works steps


Step 1. connect to the server

1. A client logs in the system. (if a user is loggoned)
2. A client connects the server with a socket (ClientSocket Class)
3. A server get socketId, and userId (ServerSocket Class)
4. A server stores socketId, and userId on Redis

Step 2. Join chatting room // Request Status Control

1. UserA sends chatting request to UserB (ClientChatService )
2. The Server geta a message
3. Check if a user is connected by searching redis (ServerSocket Class)









*/

// then socket -> findUser()

// when a client access to the socket. socket.Id, userId

// When a user sends message, a user sends his

// client => send message with userID.

socket.on('sendMessageFromUser', message => {})
