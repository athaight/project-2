// Where the server is hosting socket.js app
const socket = io('http://localhost:3001')

// Data from server to call function
socket.on('chat-message', data => {
    console.log(data)
})

