import { Router } from "express";
import {
  checkNotAuthenticated,
  checkAuthenticated,
} from "../middlewares/auth.js";
import SessionController from "../controllers/session.controllers.js";
const controller = new SessionController();

const router = Router();

router.post("/register", controller.register);

router.post("/login", checkNotAuthenticated, controller.login);

router.post("/logout", checkAuthenticated, controller.logout);

export default router;
