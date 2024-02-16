import { Router } from "express";
import { checkUser } from "../middlewares/auth.js";
import { saveProductValidator } from "../middlewares/cartValidator.js";
import CartController from "../controllers/cart.controllers.js";
const controller = new CartController();

const router = Router();

router
  .get("/", controller.getCarts) // Only for testing
  .get("/:cid", controller.getCartById)
  .post("/", controller.create)
  .post(
    "/:cid/products/:pid",
    checkUser,
    saveProductValidator,
    controller.saveProductToCart
  )
  .put("/:cid", controller.updateCart)
  .put("/:cid/products/:pid", controller.updateProductQuantity)
  .delete("/:cid", controller.deleteProductsFromCart)
  .delete("/:cid/products/:pid", controller.deleteProductFromCart)
  .post("/:cid/purchase", controller.generateTicket);

export default router;
