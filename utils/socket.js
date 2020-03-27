const socketIO = require('socket.io')

class Socket {
    init(server, client) {
        this.io = socketIO(server)
        this.client = client
    }

    extractObjectAsArray(obj) {
        let arr = []
        Object.keys(obj).map((key) => {
            arr.push(key)
            arr.push(obj[key])
        })
        arr.slice(0, 1)
        return arr
    }

    listenSocketEvents(socket) {
        this.io.on('connection', (socket) => {
            this.userEvent(socket)
            this.messsageEvent(socket)
        })
    }

    listenUserEvents(socket) {
        socket.on('user', (data) => {
            const user = this.extractObjectAsArray(data)
            this.client
                .hmsetAsync(user)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        })
    }

    listenMessageEvent(socket) {
        socket.on('getMessage', (data) => {
            if (this.client.existAsync(data.toid)) {
                socket.broadcast.to(data.socketId).emit('sendMessage', {
                    msg: data.msg,
                    name: data.name,
                })
            }
        })
    }
}

const io = new Socket()
module.exports = io