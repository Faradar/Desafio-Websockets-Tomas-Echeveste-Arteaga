import UserServices from "../services/user.services.js";
const userService = new UserServices();

export default class UserController {
  async register(req, res, next) {
    try {
      const result = await userService.register(req.body);
      if (result.success) {
        res.status(201).redirect("/login");
      } else {
        res.status(400).redirect("/register-error");
      }
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);

      if (result.success) {
        req.session.email = email;
        req.session.password = password;
        res.status(200).redirect("/products");
      } else {
        res.status(401).redirect("/login-error");
      }
    } catch (error) {
      next(error);
    }
  }
}
