import { Router } from "express";
import { checkUser } from "../middlewares/auth.js";
import {
  saveProductValidator,
  cartOwnershipValidator,
} from "../middlewares/cartValidator.js";
import CartController from "../controllers/cart.controllers.js";
const controller = new CartController();

const router = Router();

router
  // .get("/", controller.getCarts) // Only for testing
  .get("/:cid", controller.getCartById)
  // .post("/", controller.create) // Only for testing, carts are now created when the user is created
  .post(
    "/:cid/products/:pid",
    checkUser,
    saveProductValidator,
    cartOwnershipValidator,
    controller.saveProductToCart
  )
  .put("/:cid", checkUser, cartOwnershipValidator, controller.updateCart)
  .put(
    "/:cid/products/:pid",
    checkUser,
    saveProductValidator,
    cartOwnershipValidator,
    controller.updateProductQuantity
  )
  .delete("/:cid", controller.deleteProductsFromCart)
  .delete("/:cid/products/:pid", controller.deleteProductFromCart)
  .post("/:cid/purchase", controller.generateTicket);

export default router;
