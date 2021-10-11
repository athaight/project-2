console.clear();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server); // gives us a server connection to socket.io
const session = require("express-session");
const routes = require("./routes");
const { clog } = require("./utils/clog");
const sequelize = require("./config/connection");
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

app.use(clog);

app.set("views", "./views"); // setup express server views
app.set("view engine", "ejs"); // use ejs to parse our views
app.use(express.static(__dirname + "/public")); // javascript for client side
app.use(express.urlencoded({ extended: true })); // use url paramaters instead of body for form

app.use(session(sess));
app.use(routes);

// server.listen(3001)
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log("Now listening"));
});
