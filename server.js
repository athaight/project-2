console.clear();
require("dotenv").config();
const session = require("express-session");
const express = require("express");
const passport = require("passport");
require("./utils/passport-config");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const rooms = require("./utils/rooms");
const sequelize = require("./config/connection");
const { clog } = require("./utils/clog");
const routes = require("./routes");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

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

app.set("views", "./views"); // setup express server views
app.set("view engine", "ejs"); // use ejs to parse our views

app.use(clog);
app.use(express.static("public")); // javascript for client side
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // use url paramaters instead of body for form
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

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
