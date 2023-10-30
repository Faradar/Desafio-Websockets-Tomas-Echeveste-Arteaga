import express from "express";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";

/* import { fileURLToPath } from "url";
import path from "path";
import { ProductManager } from "./managers/product.manager.js"; */

/* const __filename = fileURLToPath(import.meta.url); // Get the current module's file path
const __dirname = path.dirname(__filename); // Get the current module's directory */

const app = express();

/* const productManager = new ProductManager(
  path.join(__dirname, "../products.json")
); // Use path.join to resolve the file path */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

/* // Endpoint to get all products
app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.status(200).json(limitedProducts);
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json(error.message);
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
}); */

const port = 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
