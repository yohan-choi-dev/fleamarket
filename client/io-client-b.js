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

const chatUrl = 'http://localhost:12218/chat'
const chat = io(chatUrl, {
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

const join = (socket, user) => {
    socket.emit('join', user)
}
const loadMessage = (socket, user, rangeFrom, rangeBy) => {
    socket.emit('message.load', user, rangeFrom, rangeBy)

    socket.on('message.load.done', (data) => {
        console.log(typeof data)
        const message = data[0].message
        console.log(message)
        if (Array.isArray(data)) {
            data.forEach((record) => {
                console.log(`${record.user.name}: ${record.message.toString('utf-8')}`)
            })
        }
    })
}

join(chat, userA)

loadMessage(chat, userB, 0, 10)

const sendMessage = (socket, user, message) => {
    const data = {}
    data.user = user
    data.from = socket.query
    data.time = new Date().getUTCDate()
    data.message = message
    socket.emit('message.update', data)
}

socket.on('user.disconnect', (id) => {
    console.log(`${id} has been disconnected`)
})

chat.on('connect', () => {
    console.log(chat.id.toString('utf-8'))
})

chat.on('message.sent', (data) => {
    const user = data.message.toString('utf-8')
    const message = data.message.toString('utf-8') // this wili be need in some env
    console.log(`${data.from.name}:${message}`)
})

chat.on('message.update.done', (data) => {
    const message = data.message.toString('utf-8')
    console.log(`${data.from.name}: ${message}`)
})

const startChat = () => {
    const userInput = process.stdin
    userInput.setEncoding('utf-8')
    userInput.on('data', (message) => {
        sendMessage(chat, userB, message)
    })
}

startChat()
