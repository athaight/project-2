const router = require("express").Router();
const { User } = require("../models/user");
const withAuth = require("../utils/auth")

router.get("/register", (req, res) => {
  res.render("register")
})


router.get("/login", (req, res) => {console.log('ahhhhhhhhhhhhhhhhh')
  // if (req.session.logged_in) {
  //   res.redirect("/");
  //   return;
  // }

  res.render("login");
});

module.exports = router;