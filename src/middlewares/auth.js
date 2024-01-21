function checkAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  next();
}

function checkAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.status(401).json({ message: "You are not an admin" });
}

function checkUser(req, res, next) {
  if (req.session.user && req.session.user.role === "user") {
    return next();
  }
  res.status(401).json({ message: "You are not a user" });
}

export { checkAuthenticated, checkNotAuthenticated, checkAdmin, checkUser };
