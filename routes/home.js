if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const router = require("express").Router();
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");
// const { User } = require("../../models/user");
const rooms = {};
const user = [];

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));

// const newUser = User.create(req.body);
// console.log(newUser);
router.get("/", (req, res) => {
  res.render("index.ejs", { rooms: rooms });
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

module.exports = router;
