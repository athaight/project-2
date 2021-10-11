console.clear();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const router = express.Router();
// const io = require("socket.io")(server); // gives us a server connection to socket.io
const session = require("express-session");
const routes = require("./routes");
const { clog } = require("./utils/clog");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
// gives us a server connection to socket.io
const io = require("socket.io")(server);
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Bruh",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(clog);

app.set("views", "./views"); // setup express server views
app.set("view engine", "ejs"); // use ejs to parse our views
app.use(express.static(__dirname + "/public")); // javascript for client side
app.use(express.urlencoded({ extended: true })); // use url paramaters instead of body for form

app.use(session(sess));
app.use(routes);

// server.listen(3001)
const rooms = {};

router.get("/rooms", (req, res) => {
  res.render("index", { rooms: rooms });
  console.log("rooms");
});

router.post("/rooms", (req, res) => {
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

io.on("connection", (socket) => {
  socket.on("new-user", (room, name) => {
    socket.join(room);
    rooms[room].users[socket.id] = name;
    console.log(name);
    console.log(room);
    socket.broadcast.to(room).emit("user-connected", name);
  });
  socket.on("send-chat-message", (room, message, time) => {
    socket.broadcast.to(room).emit("chat-message", {
      message: message,
      name: rooms[room].users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    getUserRooms(socket).forEach((room) => {
      socket.broadcast
        .to(room)
        .emit("user-disconnected", rooms[room].users[socket.id]);
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

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log("Now listening"));
});

module.exports = router;
