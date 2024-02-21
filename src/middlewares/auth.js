import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

export function checkHome(req, res, next) {
  const { user } = req.session || {};
  if (user) {
    return res.redirect("/products");
  }
  res.redirect("/login");
}

export function checkAuthenticated(req, res, next) {
  const { user } = req.session || {};
  if (user) {
    return next();
  }
  res.redirect("/login");
}

export function checkNotAuthenticated(req, res, next) {
  const { user } = req.session || {};
  if (user) {
    return res.redirect("/profile");
  }
  next();
}

export function checkAdmin(req, res, next) {
  const { user } = req.session || {};
  if (!user) {
    return httpResponse.Forbidden(res, user, "User is not defined");
  } else if (user.role === "admin") {
    return next();
  }
  return httpResponse.Forbidden(res, user, "You are not an admin");
}

export function checkUser(req, res, next) {
  const { user } = req.session || {};
  if (!user) {
    return httpResponse.Forbidden(res, user, "User is not defined");
  } else if (user.role === "user" || user.role === "premium") {
    return next();
  }
  return httpResponse.Forbidden(res, user, "You are not a user");
}

export function checkPremium(req, res, next) {
  const { user } = req.session || {};
  if (!user) {
    return httpResponse.Forbidden(res, user, "User is not defined");
  } else if (user.role === "premium" || user.role === "admin") {
    return next();
  }
  return httpResponse.Forbidden(
    res,
    user,
    "You are not a premium user or an admin"
  );
}
