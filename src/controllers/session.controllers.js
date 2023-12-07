import SessionServices from "../services/session.services.js";
const sessionService = new SessionServices();

export default class SessionController {
  async register(req, res, next) {
    try {
      if (req.body.email === "adminCoder@coder.com") {
        res.status(400).redirect("/register-error");
      } else {
        const result = await sessionService.register(req.body);
        if (result.success) {
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
      if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        req.session.user = {
          email: "adminCoder@coder.com",
          role: "admin",
          first_name: "admin",
          last_name: "admin",
          age: 0,
          _id: 0,
        };
        res.status(200).redirect("/products");
      } else {
        const result = await sessionService.login(email, password);

        if (result.success) {
          req.session.user = {
            ...result.user._doc,
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
}
