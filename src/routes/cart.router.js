import { __dirname } from "../utils.js";
import { Router } from "express";
const router = Router();

import { CartManager } from "../managers/cart.manager.js";
const cartManager = new CartManager(__dirname + "/data/carts.json");

import { ProductManager } from "../managers/product.manager.js";
const productManager = new ProductManager(__dirname + "/data/products.json");

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const carts = await cartManager.getCarts();

    if (limit) {
      const limitedCarts = carts.slice(0, parseInt(limit));
      res.status(200).json(limitedCarts);
    } else {
      res.status(200).json(carts);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const cartCreated = await cartManager.createCart(req.body);
    res.status(200).json(cartCreated);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.getCartById(cid);
    const product = await productManager.getProductById(pid);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedCart = await cartManager.saveProductToCart(cid, pid);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
