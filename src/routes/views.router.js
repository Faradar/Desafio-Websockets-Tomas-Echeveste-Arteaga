import { Router } from "express";
import * as controller from "../controllers/views.controllers.js";

const router = Router();

router.get("/", controller.home);

router.get("/realtimeproducts", controller.realTimeProducts);

router.get("/chat", controller.chat);

router.get("/products", controller.products);

router.get("/products/:pid", controller.productDetails);

router.get("/carts/:cid", controller.cartDetails);

export default router;
