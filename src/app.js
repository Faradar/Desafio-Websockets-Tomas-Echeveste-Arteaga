import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

import { ProductManager } from "./managers/product.manager.js";
const productManager = new ProductManager(__dirname + "/data/products.json");

const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const server = new Server(httpServer);

server.on("connection", async (socket) => {
  console.log(`🟢 User connected ${socket.id}`);

  try {
    const products = await productManager.getProducts();
    socket.emit("updateProducts", products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  socket.on("addProduct", async (productData) => {
    try {
      const newProduct = await productManager.createProduct(productData);
      if (newProduct) {
        const updatedProducts = await productManager.getProducts(); // Updated to use 'await'
        server.emit("updateProducts", updatedProducts);
      } else {
        socket.emit("productCreationFailed", "Failed to create the product.");
      }
    } catch (error) {
      console.error("Error adding a new product:", error);
      socket.emit("productCreationFailed", "Failed to create the product.");
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔴 User disconnected ${socket.id}`);
  });
});
