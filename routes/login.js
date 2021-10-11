const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.js");

router.get("/", (req, res) => {
  res.render("login.ejs");
});

router.post("/", passport.authenticate("local"), function (req, res) {
  res.redirect("/");
});

router.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
