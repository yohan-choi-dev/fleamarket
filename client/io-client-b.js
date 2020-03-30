const io = require('socket.io-client')

const url = 'http://localhost:12218'

const user = {
    id: '12',
    name: 'william.to',
    email: 'iamwilliam@myseneca.ca'
}

const socket = io(url, {
    query: user
})

socket.on('message.sent', (data) => {
    console.log(`${data.username}: ${data.message}`)
})

const sendMessage = (data) => {
    socket.emit('message.send', data)
}

const startChat = () => {
    const userInput = process.stdin
    userInput.on('data', (message) => {
        let data = {}
        data.message = message
        data.username = user.name
        sendMessage(data)
    })
}

startChat()
