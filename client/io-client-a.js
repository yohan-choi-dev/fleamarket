const io = require('socket.io-client')
const chatInterface = require('./chat-interface')
const { PROFILES } = require('./mock-data')

const user01 = PROFILES[0]

const url = 'http://localhost:12218'

const userA = {
    id: '10',
    name: 'yohan.choi',
    email: 'ychoi63@myseneca.ca',
    to: userB.id
}

const userB = {
    id: '11',
    name: 'william.to',
    email: 'william.to@myseneca.ca',
    to: userA.id
}

const socket = io(url, {
    query: userA
})

const chatUrl = 'http://localhost:12218/chat'
const chat = io(chatUrl, userA)

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
