import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import ProductController from "../controllers/product.controllers.js";
const controller = new ProductController();

const router = Router();

router
  .get("/", controller.getProducts)
  .get("/:pid", controller.getProductById)
  .post("/", productValidator, controller.create)
  .put("/:pid", controller.update)
  .delete("/:pid", controller.delete)
  .get("/dto/:pid", controller.getDtoProductById);

export default router;
