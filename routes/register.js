const router = require("express").Router();
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");
const { User } = require("../../models/user");

router.use(flash());
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride("_method"));

router.get("/", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

router.post("/", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    User.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = router;
