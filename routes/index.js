const router = require("express").Router();
const apiRoute = require("./api");
const homeRoute = require("./home");

router.use("/api", apiRoute);
router.use("/", homeRoute);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 8068fd9d2bb7732b31db5aa6cbb9b946eee51326
