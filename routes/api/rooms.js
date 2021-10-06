const router = require("express").Router();

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

module.exports = router;