const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("register.ejs");
});

router.post("/", passport.authenticate("local-signup"), function (req, res) {
  res.json(req.user);
});

module.exports = router;
