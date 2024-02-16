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
  if (!req.user) {
    return httpResponse.Forbidden(res, req.user, "User is not defined");
  } else if (req.user.role === "admin") {
    return next();
  }
  return httpResponse.Forbidden(res, req.user, "You are not an admin");
}

export function checkUser(req, res, next) {
  if (!req.user) {
    return httpResponse.Forbidden(res, req.user, "User is not defined");
  } else if (req.user.role === "user" || req.user.role === "premium") {
    return next();
  }
  return httpResponse.Forbidden(res, req.user, "You are not a user");
}

export function checkPremium(req, res, next) {
  if (!req.user) {
    return httpResponse.Forbidden(res, req.user, "User is not defined");
  } else if (req.user.role === "premium" || req.user.role === "admin") {
    return next();
  }
  return httpResponse.Forbidden(
    res,
    req.user,
    "You are not a premium user or an admin"
  );
}
