import { Router } from "express";
import * as controller from "../controllers/product.controllers.js";
import { productValidator } from "../middlewares/productValidator.js";

const router = Router();

router.get("/", controller.getProducts);

router.get("/:pid", controller.getProductById);

router.post("/", productValidator, controller.createProduct);

router.put("/:pid", controller.updateProduct);

router.delete("/:pid", controller.deleteProduct);

export default router;
