import { Router } from "express";
import CartController from "../controllers/cart.controllers.js";
const controller = new CartController();

const router = Router();

router.get("/", controller.getCarts);

router.get("/:cid", controller.getCartById);

router.post("/", controller.create);

router.post("/:cid/products/:pid", controller.saveProductToCart);

router.put("/:cid", controller.updateCart);

router.put("/:cid/products/:pid", controller.updateProductQuantity);

router.delete("/:cid", controller.deleteProductsFromCart);

router.delete("/:cid/products/:pid", controller.deleteProductFromCart);

export default router;
