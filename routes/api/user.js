
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcrypt')
const router = require("express").Router();
const passport = require('passport')
const flash = require('express-flash')
const methodOverride = require('method-override')
const { User } = require("../../models");


router.use(flash())
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

router.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  
}))

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

router.post('/register', async (req, res) => {
  try { console.log(req.body)
    // const hashedPassword = await bcrypt.hash(req.body.password, 10)
    // console.log(hashedPassword)
    let userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
console.log(userData)
    res.json('Success!')
  } catch (error) {
    res.json(error)
    console.log(error)
  }
})

router.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

module.exports = router;
