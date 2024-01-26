import config from "../config/config.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

export const userValidator = (req, res, next) => {
  const user = req.body;
  user.age = parseInt(user.age, 10);
  const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (
    user.first_name === undefined ||
    typeof user.first_name !== "string" ||
    user.last_name === undefined ||
    typeof user.last_name !== "string" ||
    user.email === undefined ||
    typeof user.email !== "string" ||
    !emailRegex.test(user.email) ||
    user.email === config.ADMIN_EMAIL ||
    user.age === undefined ||
    isNaN(user.age) ||
    user.password === undefined ||
    typeof user.password !== "string"
  ) {
    return httpResponse.BadRequest(res, user, "Invalid user");
  } else {
    next();
  }
};
