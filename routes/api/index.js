const router = require("express").Router();

const roomRoute = require("./rooms");

router.use("/rooms", roomRoute);

module.exports = router;
