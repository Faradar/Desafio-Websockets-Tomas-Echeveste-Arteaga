import Controllers from "./class.controller.js";
import UserService from "../services/user.services.js";
const userService = new UserService();
import config from "../config/config.js";

export default class UserController extends Controllers {
  async register(req, res, next) {
    try {
      if (req.body.email === config.ADMIN_EMAIL) {
        res.status(400).redirect("/register-error");
      } else {
        const userId = req.session.passport.user;
        if (userId) {
          res.status(201).redirect("/login");
        } else {
          res.status(400).redirect("/register-error");
        }
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
          _id: 0,
        };
        res.status(200).redirect("/products");
      } else {
        const userId = req.session.passport.user;
        if (userId) {
          const user = await userService.getById(userId);
          req.session.user = {
            ...user._doc,
          };
          res.status(200).redirect("/products");
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
          console.error(err);
          return res.status(500).send("Error destroying session");
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
      const user = req.session.user;
      if (user) res.status(200).json(user);
      else res.status(400).json({ message: "Something went wrong" });
    } catch (error) {
      next(error);
    }
  }
}
