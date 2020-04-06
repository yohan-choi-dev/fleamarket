function User(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
}

function Socket(io, url, user) {
    this.io = io(url, {
        query: {
            ...user
        }
    })
    return this.io
}

function initTrading(user) {
    const input = process.stdin
    input.setEncoding('utf-8')
    input.on('data', (message) => {})
}

function joinTrading() {}

const io = require('socket.io-client')
const ROOT_URL = 'http://localhost:12218'
const TRADE_URL = 'http://localhost:12218/trade'

// init user info
const userA = new User(7, 'james.bourne', 'james.bourne@myseneca.ca')
const userB = new User(8, 'alex.smith', 'alex.smith@myseneca.ca')

// init socket
const socket = new Socket(io, ROOT_URL, userA)
const trade = new Socket(io, TRADE_URL, userA)

initTrading(userA)
