const socketIO = require('socket.io')
/*
This is the flow of thinking for socket commuication. 

This can be helpful for the future update or documentation. 

This is a logical flow of the web socket service, it can be change anytime.


To make reliable connection in socket communication, we shoud be albe to keep track the flow of data with each event.

socket.id is unique identifier, which can use each user

but if a user lose thier connection, or connecting from another browser will cause error. 

but the end point of socket.io will be socket.id.

The worst case scenario, a user only can receive message from only one session of connection.

for instance, if a user login with two different browsers. then they will have different socket.id 
(or if we restrict one socket id for one user.

a user cannot use our service if they forgot to close web browser at home. But he is outside to tra
de stuff. So this can't be desirable options    )

Therefore, socket id can be use to identtity each connection, not each user. 

but we have to identify a user, so we need database to keep track of the communciation between users. 

To secure every connection, We need unguessable uniqure identifer

Also we have to deal with each session between socket communication. However, since every connection makes a new session, 

if we store the data in the db server, the frequent change will be a bottle neck so it will make the whole db slower,

and this will affetc ohter APIs too. So we need another way to deal with these session information. 

However, we can't store this data on our application. Because the first it will cause memory shortage. Secondly, the data easily can be disapper by any errors

such as the shortage of heap stacks...

performance and stability. the compromise between two choise is redis. ......etc...

Redis only store session data maximum for a day. but it is enough since we will set the session will be expired. So session will be stored on Disk every certain time.

( BTW, query database does not affect on performance a lot, but writing need more resource from database.

Redis only store session number 


*/

// Redis Mapping SocketID, UserID

class Socket {
    constructor(server, redis) {
        this.server = server
        this.redis = redis
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
            this.redis
                .hmsetAsync(user)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        })
    }

    listenMessageEvent(socket) {
        socket.on('getMessage', (data) => {
            if (this.redis.existAsync(data.toid)) {
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