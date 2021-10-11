const router = require("express").Router();
const apiRoute = require("./api");
const homeRoute = require("./home");
const loginRoute = require("./login");
const registerRoute = require("./register");

router.use("/api", apiRoute);
router.use("/", homeRoute);
router.use("/login", loginRoute);
router.use("/register", registerRoute);

module.exports = router;