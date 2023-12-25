import { Router } from "express";
import {
  checkAuthenticated,
  checkNotAuthenticated,
} from "../middlewares/auth.js";
import ViewController from "../controllers/views.controllers.js";
const controller = new ViewController();

const router = Router();

router.get("/", checkAuthenticated, controller.home);

router.get("/login", checkNotAuthenticated, controller.login);

router.get("/register", checkNotAuthenticated, controller.register);

router.get("/profile", checkAuthenticated, controller.profile);

router.get("/register-error", checkNotAuthenticated, controller.registerError);

router.get("/login-error", checkNotAuthenticated, controller.loginError);

router.get("/products", checkAuthenticated, controller.products);

router.get("/products/:pid", checkAuthenticated, controller.productDetails);

router.get("/carts/:cid", checkAuthenticated, controller.cartDetails);

// Extra views using websocket
router.get(
  "/realtimeproducts",
  checkAuthenticated,
  controller.realTimeProducts
);

router.get("/chat", checkAuthenticated, controller.chat);

router.get("*", (req, res) => {
  res.status(404).send("Ruta inexistente");
});

export default router;
