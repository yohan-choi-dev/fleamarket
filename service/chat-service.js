
const { promisify } = require('util')

const User = require('../models/user')
const Item = require('../models/item')

// Event Driven Programming (For Event Listener) + Functional programming (For data flows)

class ChatService {
    constructor(io, namespace) {
        this.io = io
        this.namespace = namespace
    }

    init() {
        if (!this.io) {
            console.error('socket io is not initialized')
        }

        this.io.on('connnection', (socket) => {

        })

    }

    static async addUser() {

    }

    static async checkUser() {

    }

    static async sendMessageToServer(socket) {

    }

    static async fetchMessageFromServer(socket) {

    }

    static async checkMessageStatus(socket) {

    }

    static async joinRoom(socket) {

    }

    static async leavingRoom(socket) {

    }
    
    static async deleteUser() {

    }
}