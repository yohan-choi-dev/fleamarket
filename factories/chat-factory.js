const Chatroom = require('../models/chatroom')

module.exports = (socket, redis) => {
    const chatroomService = {}

    chatroomService.createChatroom = async () => {
        const chatroom = Chatroom.create()
    }
}