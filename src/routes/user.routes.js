import { Router } from "express";
import { userValidator } from "../middlewares/userValidator.js";
import {
  checkNotAuthenticated,
  checkAuthenticated,
  checkAdmin,
} from "../middlewares/auth.js";
import UserController from "../controllers/user.controllers.js";
const controller = new UserController();
import passport from "passport";

const router = Router();

router
  .post(
    "/register",
    checkNotAuthenticated,
    userValidator,
    passport.authenticate("register"),
    controller.register
  )
  .post(
    "/login",
    checkNotAuthenticated,
    passport.authenticate("login"),
    controller.login
  )
  .post("/logout", checkAuthenticated, controller.logout)
  .get(
    "/github",
    checkNotAuthenticated,
    passport.authenticate("github", {
      scope: ["user:email"],
    }),
    controller.github
  )
  .get(
    "/oauth2/redirect/accounts.google.com",
    checkNotAuthenticated,
    passport.authenticate("google", {
      assignProperty: "user",
    }),
    controller.google
  )
  .get("/currentUser", checkAuthenticated, controller.currentUser)
  .get("/users", checkAdmin, controller.users)
  .post("/resetPassword", controller.resetPass)
  .put("/newPassword", controller.updatePass)
  .put("/premium/:uid", checkAdmin, controller.togglePremium)
  .delete("/deleteInactive", checkAdmin, controller.deleteInactive);

export default router;
