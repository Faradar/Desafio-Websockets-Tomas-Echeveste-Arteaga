export function checkAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
}

export function checkNotAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  next();
}

export function checkAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "You are not an admin" });
}

export function checkUser(req, res, next) {
  if (req.session.user && req.session.user.role === "user") {
    return next();
  }
  res.status(403).json({ message: "You are not a user" });
}
