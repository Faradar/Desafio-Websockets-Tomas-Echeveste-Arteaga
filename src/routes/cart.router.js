import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";

const router = Router();

router.get("/", controller.getCarts);

router.get("/:cid", controller.getCartById);

router.post("/", controller.createCart);

router.post("/:cid/products/:pid", controller.saveProductToCart);

export default router;
