// Where the server is hosting socket.js app
const socket = io('http://localhost:3001')

// Data from server to call function
socket.on('chat-message', data => {
    console.log(data)
})

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    } else {
    }
  });