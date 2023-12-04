import { Router } from "express";
import {
  checkAuthenticated,
  checkNotAuthenticated,
} from "../middlewares/auth.js";
import * as controller from "../controllers/views.controllers.js";

const router = Router();

// router.get("/", controller.home);

router.get("/", checkNotAuthenticated, controller.login);

router.get("/register", checkNotAuthenticated, controller.register);

router.get("/profile", checkAuthenticated, controller.profile);

router.get("/register-error", checkNotAuthenticated, controller.registerError);

router.get("/login-error", checkNotAuthenticated, controller.loginError);

router.get("/products", checkAuthenticated, controller.products);

router.get("/products/:pid", checkAuthenticated, controller.productDetails);

router.get("/carts/:cid", checkAuthenticated, controller.cartDetails);

// Extra views using websocket
router.get("/realtimeproducts", controller.realTimeProducts);

router.get("/chat", controller.chat);

export default router;
