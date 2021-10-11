const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const signupUser = async (req, email, password, done) => {
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  const user = await User.findOne({ where: { email } });

  // check to see if theres already a user with that email
  if (user) {
    return done(null, false);
  } else {
    // if there is no user with that email
    // create the user
    var newUser = await User.create({
      name: req.body.name,
      email,
      password,
    });

    return done(null, newUser);
  }
};

const authenticateUser = async (email, password, done) => {
  console.log(email);
  const user = await User.findOne({
    where: { email },
  });
  if (user === null) {
    return done(null, false, { message: "No user with that email" });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect" });
    }
  } catch (e) {
    return done(e);
  }
};

passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true, // allows us to pass back the entire request to the callback
    },
    signupUser
  )
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  return done(null, await User.findByPk(id));
});
