const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.js");

router.get("/", (req, res) => {
  res.render("login.ejs");
});

router.post("/", passport.authenticate("local"), function (req, res) {
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  console.log("what");
  req.logOut();
  res.redirect("/login");
});

module.exports = router;
