import { Router } from "express";
import CartController from "../controllers/cart.controllers.js";
const controller = new CartController();

const router = Router();

router
  .get("/", controller.getCarts)
  .get("/:cid", controller.getCartById)
  .post("/", controller.create)
  .post("/:cid/products/:pid", controller.saveProductToCart)
  .put("/:cid", controller.updateCart)
  .put("/:cid/products/:pid", controller.updateProductQuantity)
  .delete("/:cid", controller.deleteProductsFromCart)
  .delete("/:cid/products/:pid", controller.deleteProductFromCart);

export default router;
