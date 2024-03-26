import errorsDictionary from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import Controllers from "./class.controllers.js";
import UserService from "../services/user.services.js";
const userService = new UserService();
import config from "../config/config.js";

export default class UserController extends Controllers {
  constructor() {
    super(userService);
  }

  async register(req, res, next) {
    try {
      const userId = req.session.passport.user;
      if (userId) {
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
      if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
        req.session.user = {
          email: config.ADMIN_EMAIL,
          role: "admin",
          first_name: "admin",
          last_name: "admin",
          age: 0,
          _id: "admin",
        };
        res.status(302).redirect("/products");
      } else {
        const userId = req.session.passport.user;
        if (!userId) {
          res.status(401).redirect("/login-error");
        }
        const user = await userService.getById(userId);
        if (!user) {
          res.status(401).redirect("/login-error");
        }
        user.last_connection = new Date();
        await user.save();
        req.session.user = {
          ...user._doc,
        };
        res.status(302).redirect("/products");
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      if (req.session.user.role !== "admin") {
        const userId = req.session.user._id;
        const user = await userService.getById(userId);
        user.last_connection = new Date();
        await user.save();
      }
      req.session.destroy((err) => {
        if (err) {
          return httpResponse.ServerError(res, err, "Error destroying session");
        }
        res.clearCookie("connect.sid", {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: true,
        });
        res.redirect("/login");
      });
    } catch (error) {
      next(error);
    }
  }

  async github(req, res, next) {
    try {
      const userId = req.user._id;
      if (userId) {
        const user = await userService.getById(userId);
        req.session.user = {
          ...user._doc,
        };
        res.status(200).redirect("/products");
      } else {
        res.status(401).redirect("/login-error");
      }
    } catch (error) {
      next(error);
    }
  }

  async google(req, res, next) {
    try {
      const userId = req.user._id;
      if (userId) {
        const user = await userService.getById(userId);
        req.session.user = {
          ...user._doc,
        };
        res.status(200).redirect("/products");
      } else {
        res.status(401).redirect("/login-error");
      }
    } catch (error) {
      next(error);
    }
  }

  async currentUser(req, res, next) {
    try {
      let user;
      if (req.session.user.role === "admin") {
        req.session.user = {
          email: config.ADMIN_EMAIL,
          role: "admin",
          first_name: "admin",
          last_name: "admin",
          age: 0,
        };
        user = req.session.user;
      } else {
        const userId = req.session.user._id;
        user = await userService.getDtoUserById(userId);
      }
      if (!user) {
        return httpResponse.NotFound(res, user, errorsDictionary.USER_404);
      } else {
        return httpResponse.Ok(res, user);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getDtoUsers();
      return httpResponse.Ok(res, users);
    } catch (error) {
      next(error);
    }
  }

  async resetPass(req, res, next) {
    try {
      const tokenResetPass = await userService.resetPass(req.body.email);
      if (tokenResetPass) {
        res.cookie("tokenpass", tokenResetPass, {
          httpOnly: true,
          secure: true,
        });
        res.status(200).redirect("/forgotPassword/success");
      } else
        return httpResponse.NotFound(
          res,
          `email "${req.body.email}" not found`
        );
    } catch (error) {
      next(error);
    }
  }

  async updatePass(req, res, next) {
    try {
      const { password } = req.body;
      const { tokenpass } = req.cookies;
      if (!tokenpass) return httpResponse.Unauthorized(res, "Token not found");
      const updPass = await userService.updatePass(password, tokenpass);
      if (updPass === "TokenExpired")
        return httpResponse.Unauthorized(res, "Token expired");
      if (!updPass)
        return httpResponse.BadRequest(res, "Password must be different");
      res.clearCookie("tokenpass");
      return httpResponse.Ok(res, updPass);
    } catch (error) {
      next(error);
    }
  }

  async togglePremium(req, res, next) {
    try {
      const { uid } = req.params;
      const user = await userService.togglePremium(uid);
      return httpResponse.Ok(res, user, "User role updated successfully");
    } catch (error) {
      next(error);
    }
  }

  async deleteInactive(req, res, next) {
    try {
      const inactiveUsers = await userService.deleteInactive();
      if (!inactiveUsers) {
        return httpResponse.NotFound(res, "Inactive users not found");
      }
      return httpResponse.Ok(
        res,
        inactiveUsers,
        "Inactive users have been deleted and notified."
      );
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { uid } = req.params;
      const user = await userService.deleteUser(uid);
      if (!user) {
        return httpResponse.NotFound(res, "User not found");
      }
      return httpResponse.Ok(res, user, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
