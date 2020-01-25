const io = require('socket.io');

// this will be moved later
io.on('connection', (socket) => {
    console.log('A user is connected');
});

module.exports = function(server) {

}
