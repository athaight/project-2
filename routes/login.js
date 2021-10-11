const router = require("express").Router();
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");
// const { User } = require("../../models/user");

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));

router.get("/", (req, res) => {
  res.render("login.ejs");
});

router.post(
  "/",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

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
