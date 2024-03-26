import { Router } from "express";
import {
  productValidator,
  createValidator,
  updateValidator,
  deleteValidator,
} from "../middlewares/productValidator.js";
import { checkPremium } from "../middlewares/auth.js";
import ProductController from "../controllers/product.controllers.js";
const controller = new ProductController();

const router = Router();

router
  .get("/", controller.getProducts)
  .get("/:id", controller.getProductById)
  .post("/", checkPremium, productValidator, createValidator, controller.create)
  .put("/:id", checkPremium, updateValidator, controller.update)
  .delete("/:id", checkPremium, deleteValidator, controller.deleteProduct)
  .get("/dto/:id", controller.getDtoProductById)
  .post("/mockingproducts", controller.generateMockProduct);

export default router;
