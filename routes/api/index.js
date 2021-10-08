const router = require("express").Router();

const userRoute = require("./user");
const roomRoute = require("./rooms");

router.use("/user", userRoute);
router.use("/rooms", roomRoute);

module.exports = router;
