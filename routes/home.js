const router = require("express").Router();
const rooms = require("../utils/rooms");
const { authUser } = require("../utils/auth");

router.get("/", authUser, (req, res) => {
  res.render("index.ejs", { rooms });
});

module.exports = router;
