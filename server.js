const io = require('socket.io')(3001, {
    cors:{
        orgin: ['http://localhost:3001'],

    },
})

io.on('connection', socket => {
    console.log('new user')
    socket.emit('chat-message', 'Hello World')
})
