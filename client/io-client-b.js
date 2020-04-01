const io = require('socket.io-client')
const chatInterface = require('./chat-interface')

const url = 'http://localhost:12218'

const userB = {
    id: '10',
    name: 'yohan.choi',
    email: 'ychoi63@myseneca.ca',
    to: ''
}

const userA = {
    id: '11',
    name: 'william.to',
    email: 'william.to@myseneca.ca',
    to: ''
}

userA.to = userB.id
userB.to = userA.id

const socket = io(url, {
    query: {
        ...userA
    }
})

const getUserStatus = (socket, user) => {
    socket.emit('user.getStatus', user)

    socket.on('user.getStatus.done', (id, status) => {
        const userId = id.toString('utf-8')
        const userStatus = status.toString('utf-8')
        console.log(`${userId}'s status: ${userStatus}`)
    })
}

getUserStatus(socket, userB)

socket.on('user.disconnect', (id) => {
    console.log(`${id} has been disconnected`)
})

const chatUrl = 'http://localhost:12218/chat'
const chat = io(chatUrl, {
    query: {
        ...userA
    }
})

chat.on('connect', () => {
    console.log(chat.id)
})

chat.on('message.sent', (data) => {
    const str = data.message.toString('utf-8') // this wili be need in some env
    console.log(`${data.from}:${str}`)
})

const sendMessage = (data) => {
    chat.emit('message.send', data)
}

chatInterface()

const startChat = () => {
    const userInput = process.stdin
    userInput.on('data', (message) => {
        let data = {
            message: message,
            from: userA.id,
            to: userB.id
        }
        sendMessage(data)
    })
}

startChat()
