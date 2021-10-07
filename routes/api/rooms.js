const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const router = require("express").Router();

const rooms = {};

router.get('/', (req, res) => {
  res.render('index', { rooms: rooms })
})

router.post("/", (req, res) => {
  if (rooms[req.body.room] != null) {
    return res.redirect("/");
  }
  rooms[req.body.room] = { users: {} };
  res.redirect(req.body.room);
  // Send message that new room was created
  io.emit("room-created", req.body.room);
});

router.get("/:room", (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect("/");
  }
  res.render("room", { roomName: req.params.room });
});

io.on("connection", (socket) => {
  socket.on("new-user", (room, name) => {
    socket.join(room);
    rooms[room].users[socket.id] = name;
    socket.to(room).broadcast.emit("user-connected", name);
  });
  socket.on("send-chat-message", (room, message) => {
    socket.to(room).broadcast.emit("chat-message", {
      message: message,
      name: rooms[room].users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    getUserRooms(socket).forEach((room) => {
      socket
        .to(room)
        .broadcast.emit("user-disconnected", rooms[room].users[socket.id]);
      delete rooms[room].users[socket.id];
    });
  });
});

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

module.exports = router;