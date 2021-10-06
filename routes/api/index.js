const router = require("express").Router();

const userRoute = require("./user");
const roomRoute = require("./rooms");

router.use("/user", userRoute);
router.use("/room", roomRoute);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 8068fd9d2bb7732b31db5aa6cbb9b946eee51326
