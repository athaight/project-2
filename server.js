<<<<<<< HEAD
const socket = require('socket.io');
const express = require('express')
=======
const io = require('socket.io')(3001, {
    cors:{
        orgin: ['http://localhost:3001'],

    },
})

io.on('connection', socket => {
    console.log('new user')
    socket.emit('chat-message', 'Hello World')
})
>>>>>>> 2e58ddb02b246212bf31f6fc84292a306c018594
