const router = require("express").Router();

const express = require("express");
const app = express();
const server = require("http").Server(app);
// const socket = io("http://localhost:3001");
const io = require("socket.io")(server); // gives us a server connection to socket.io
const rooms = require("../../utils/rooms");

router.get("/", (req, res) => {
  res.render("index", { rooms: rooms });
  console.log("rooms");
});

router.post("/", (req, res) => {
  if (rooms[req.body.room] != null) {
    console.log("rooms");
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
  console.log("rooms");

  res.render("room", { roomName: req.params.room });
});

module.exports = router;
