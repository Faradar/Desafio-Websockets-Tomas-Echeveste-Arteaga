import { Router } from "express";
import {
  checkNotAuthenticated,
  checkAuthenticated,
} from "../middlewares/auth.js";
import SessionController from "../controllers/session.controllers.js";
const controller = new SessionController();
import passport from "passport";

const router = Router();

router.post(
  "/register",
  checkNotAuthenticated,
  passport.authenticate("register"),
  controller.register
);

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("login"),
  controller.login
);

router.post("/logout", checkAuthenticated, controller.logout);

export default router;
