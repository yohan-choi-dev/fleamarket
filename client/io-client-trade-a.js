/*
Pseudo Code

James is in the chatroom with Alex
James chooses an item to exchange
James clicks Trade with Alex button
Alex clicks confirm trade button
Alex clicks cancels trade button
James clicks complete trade button

Once Trade has been completed, then a user can give start

*/

function User(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
}

function Item(id, name) {
    this.id = id
    this.name = name
}

function Socket(io, url, user) {
    this.io = io(url, {
        query: {
            ...user
        }
    })
    return this.io
}

function TradeStatus(status) {
    this.status = status
}

const TRADE = Object.freeze({
    DEFAULT: 0,
    REQUEST_SENT_DONE: 1,
    REQUEST_ACCPTED_DONE: 2,
    REQUEST_CONFIRM_SENT: 3,
    CONFIRM_TRADE: 4,
    CANCEL_TRADE: 5,
    COMPLETE_TRADE: 6
})

let status = new TradeStatus(TRADE.DEFAULT)

function selectItem(socket, showTo, item) {
    socket.emit('select.item', showTo, item)
}

function requestTrade(socket, user, item) {
    if (status == TRADE.DEFAULT) socket.emit('user.request.trade.sent', user, item)
}

function acceptReqeustTrade(socket, user) {
    if (status == TRADE.REQUEST_SENT_DONE) socket.emit('user.request.trade.accepted', user)
}

function confirmRequest(socket, user) {
    if (status == TRADE.REQUEST_ACCEPT_DONE) socket.emit('user.request.confirm', user)
}

function confirmTrade(socket, itemA, itemB) {
    if (status == TRADE.REQUEST_CONFIRM_SENT) socket.emit('user.confirm.trade', itemA, itemB)
}

function cancelTrade(socket, tradeId) {
    if (status == TRADE.CANCEL) socket.emit('user.cancel.trade', tradeId)
}

const io = require('socket.io-client')
const ROOT_URL = 'http://localhost:12218'
const TRADE_URL = 'http://localhost:12218/trade'

// init user info
const userA = new User(71, 'William To', 'towilliam03@gmail.com')
const itemA = new Item(198, 'Vans oldskool')

const userB = new User(72, 'Yohan Choi', 'ychoi63@myseneca.ca')
const itemB = new Item(200, 'Apple is best! Buy Apple!')

// init socket
const socket = new Socket(io, ROOT_URL, userA)
const trade = new Socket(io, TRADE_URL, userA)

trade.on('trade.status', (status_code) => (status = status_code))

trade.on('user.request.trade.sent.done', (data) => {
    console.log(data)
})

trade.on('user.request.trade.accepted.done', (data) => {
    console.log(data)
})

trade.on('user.request.confirm.sent', (data) => {
    console.log(data)
})

trade.on('user.confirm.trade.done', (data) => {
    console.log(data)
})

trade.on('user.cancel.trade.done', (data) => {
    console.log(data)
})

trade.on('error', (error) => {
    console.error(error)
})

trade.on('select.item.done', (id, item) => {
    console.error(`user ${id} choose ${item.name}`)
})

let tradeId = null

const initTrading = (user) => {
    const input = process.stdin
    input.setEncoding('utf-8')
    input.on('data', (message) => {
        switch (message.trim()) {
            case 'selectItem':
                selectItem(trade, user.id, itemA)
                break
            case 'requestTrade':
                console.log('requestTrade')
                requestTrade(trade, user, itemA)
                break
            case 'acceptRequestTrade':
                console.log('acceptRequestTrade')
                acceptReqeustTrade(trade, user)
                break
            case 'confirmRequest':
                console.log('confirmRequest')
                confirmRequest(trade, user)
                break
            case 'confirmTrade':
                console.log('confirmTrade')
                confirmTrade(trade, itemA, itemB)
                break
            case 'cancelTrade':
                console.log('cancelTrade')
                cancelTrade(trade, tradeId)
                break
            default:
                console.log('default')
                break
        }
    })
}

initTrading(userA)
