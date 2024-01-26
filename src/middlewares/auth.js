import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

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
  return httpResponse.Forbidden(res, req.session.user, "You are not an admin");
}

export function checkUser(req, res, next) {
  if (req.session.user && req.session.user.role === "user") {
    return next();
  }
  return httpResponse.Forbidden(res, req.session.user, "You are not a user");
}
