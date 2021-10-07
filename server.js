const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server); // gives us a server connection to socket.io
const session = require("express-session");
const routes = require("./routes");


const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT || 3000;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.set("views", "./views"); // setup express server views
app.set("view engine", "ejs"); // use ejs to parse our views
app.use(express.static("public")); // javascript goes for client side
// app.use(express.static("views"));
app.use(express.urlencoded({ extended: true })); // use url paramaters instead of body for form

app.use(session(sess));

// const rooms = {};

// server.listen(3000);

// io.on("connection", (socket) => {
//   socket.on("new-user", (room, name) => {
//     socket.join(room);
//     rooms[room].users[socket.id] = name;
//     socket.to(room).broadcast.emit("user-connected", name);
//   });
//   socket.on("send-chat-message", (room, message) => {
//     socket.to(room).broadcast.emit("chat-message", {
//       message: message,
//       name: rooms[room].users[socket.id],
//     });
//   });
//   socket.on("disconnect", () => {
//     getUserRooms(socket).forEach((room) => {
//       socket
//         .to(room)
//         .broadcast.emit("user-disconnected", rooms[room].users[socket.id]);
//       delete rooms[room].users[socket.id];
//     });
//   });
// });

// function getUserRooms(socket) {
//   return Object.entries(rooms).reduce((names, [name, room]) => {
//     if (room.users[socket.id] != null) names.push(name);
//     return names;
//   }, []);
// }

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log("Now listening"));
});