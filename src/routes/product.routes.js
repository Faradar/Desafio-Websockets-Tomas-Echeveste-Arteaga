import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import { checkAdmin } from "../middlewares/auth.js";
import ProductController from "../controllers/product.controllers.js";
const controller = new ProductController();

const router = Router();

router
  .get("/", controller.getProducts)
  .get("/:pid", controller.getProductById)
  .post("/", checkAdmin, productValidator, controller.create)
  .put("/:pid", checkAdmin, controller.update)
  .delete("/:pid", checkAdmin, controller.delete)
  .get("/dto/:pid", controller.getDtoProductById)
  .post("/mockingproducts", controller.generateMockProduct);

export default router;
