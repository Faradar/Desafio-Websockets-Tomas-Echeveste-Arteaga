import { errorsDictionary } from "../utils/http.response.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
const userService = new UserService();
import config from "../config/config.js";

export default class UserController extends Controllers {
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
        res.status(200).redirect("/products"); // Comment this line to login with postman/thunderclient
        // return httpResponse.Ok(res, req.session.user); // Uncomment this line to login with postman/thunderclient
      } else {
        const userId = req.session.passport.user;
        if (userId) {
          const user = await userService.getById(userId);
          req.session.user = {
            ...user._doc,
          };
          res.status(200).redirect("/products"); // Comment this line to login with postman/thunderclient
          // return httpResponse.Ok(res, user); // Uncomment this line to login with postman/thunderclient
        } else {
          res.status(401).redirect("/login-error");
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return httpResponse.ServerError(res, err, "Error destroying session");
        }
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
}
