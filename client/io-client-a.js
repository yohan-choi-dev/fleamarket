const io = require('socket.io-client')

const url = 'http://localhost:12218'

const user = {
    id: '10',
    name: 'yohan.choi',
    email: 'ychoi63@myseneca.ca'
}
const userList = {}

const socket = io(url, {
    query: user
})

const sendMessage = (data) => {
    socket.emit('message.send', data)
}

socket.on('message.sent', (data) => {
    console.log(`${data.username}: ${data.message}`)
})

socket.on('user.list', (list) => {
    list.forEach((user) => {
        userList.push(user)
        console.log(user)
    })
})

socket.on('user.hugged', (username) => {
    console.log(`user ${username} hugged!`)
})

socket.on('user.remove', (id) => {})

socket.on('user.add', (addUser) => {})

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
