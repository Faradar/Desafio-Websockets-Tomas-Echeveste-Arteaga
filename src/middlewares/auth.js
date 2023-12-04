function checkAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/");
}

function checkNotAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  next();
}

export { checkAuthenticated, checkNotAuthenticated };
