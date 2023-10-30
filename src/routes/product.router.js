import { __dirname } from "../utils.js";
import { Router } from "express";
const router = Router();

import { ProductManager } from "../managers/product.manager.js";
import { productValidator } from "../middlewares/productValidator.js";
const productManager = new ProductManager(__dirname + "/data/products.json");

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, Number(limit));
      res.status(200).json(limitedProducts);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(Number(pid));
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/", productValidator, async (req, res) => {
  try {
    const productCreated = await productManager.createProduct(req.body);
    res.status(200).json(productCreated);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const product = { ...req.body };
    const { pid } = req.params;
    const idNumber = Number(pid);
    const productOk = await productManager.getProductById(idNumber);
    if (!productOk) {
      res.status(404).json({ message: "Product not found" });
    } else {
      await productManager.updateProduct(idNumber, product);
      res.status(200).json({ message: `Product id: ${idNumber} updated` });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const idNumber = Number(pid);
    await productManager.deleteProduct(idNumber);
    res.json({ message: `Product id: ${idNumber} deleted` });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
