import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { ProductManager } from "./ProductManager.js";

const __filename = fileURLToPath(import.meta.url); // Get the current module's file path
const __dirname = path.dirname(__filename); // Get the current module's directory

const app = express();
const port = 8080;
const productManager = new ProductManager(
  path.join(__dirname, "../products.json")
); // Use path.join to resolve the file path

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to get all products
app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    console.error(
      "Could not find the product under the following error:",
      error
    );
    res.status(500).json({ error: "Could not find the product" });
  }
});

// Endpoint to get a specific product by id
app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await productManager.getProductById(parseInt(productId));
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error(
      "Could not find the product under the following error:",
      error
    );
    res.status(500).json({ error: "Could not find the product" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
