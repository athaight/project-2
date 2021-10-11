module.exports = {
  authUser: function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    } else {
      next();
    }
  },
};
