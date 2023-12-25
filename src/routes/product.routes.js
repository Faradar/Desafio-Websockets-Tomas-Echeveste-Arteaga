import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import ProductController from "../controllers/product.controllers.js";
const controller = new ProductController();

const router = Router();

router.get("/", controller.getProducts);

router.get("/:pid", controller.getProductById);

router.post("/", productValidator, controller.create);

router.put("/:pid", controller.update);

router.delete("/:pid", controller.delete);

export default router;
