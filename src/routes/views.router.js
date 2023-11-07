import { __dirname } from "../utils.js";
import { Router } from "express";
const router = Router();

import { ProductManager } from "../managers/product.manager.js";
const productManager = new ProductManager(__dirname + "/data/products.json");

router.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

export default router;
