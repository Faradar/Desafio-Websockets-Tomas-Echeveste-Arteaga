import { Router } from "express";
import {
  checkAuthenticated,
  checkNotAuthenticated,
  checkUser,
} from "../middlewares/auth.js";
import ViewController from "../controllers/views.controllers.js";
const controller = new ViewController();

const router = Router();

router
  .get("/", checkAuthenticated, controller.home)
  .get("/login", checkNotAuthenticated, controller.login)
  .get("/register", checkNotAuthenticated, controller.register)
  .get("/profile", checkAuthenticated, controller.profile)
  .get("/register-error", checkNotAuthenticated, controller.registerError)
  .get("/login-error", checkNotAuthenticated, controller.loginError)
  .get("/products", checkAuthenticated, controller.products)
  .get("/products/:pid", checkAuthenticated, controller.productDetails)
  .get("/carts/:cid", checkUser, checkAuthenticated, controller.cartDetails);

// Extra views using websocket
router
  .get("/realtimeproducts", checkAuthenticated, controller.realTimeProducts)
  .get("/chat", checkUser, checkAuthenticated, controller.chat);

// 404 page
router.get("*", (req, res) => {
  res.status(404).send("Ruta inexistente");
});

export default router;
