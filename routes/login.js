const router = require("express").Router();
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");
const User = require("../models/user.js");
// const { User } = require("../../models/user");

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));

router.get("/", (req, res) => {
  res.render("login.ejs");
});

router.post("/login", function (req, res) {
  var emailAddress = req.body.email_address;
  var password = req.body.password;
  var sql = "SELECT * FROM registration WHERE email =? AND password =?";
  db.query(sql, [emailAddress, password], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      req.session.loggedinUser = true;
      req.session.emailAddress = emailAddress;
      res.redirect("/dashboard");
    } else {
      res.render("login-form", {
        alertMsg: "Your Email Address or password is wrong",
      });
    }
  });
});

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = router;
