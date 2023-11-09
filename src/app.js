import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import { configureWebSocket } from "./websocket.js";
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

const port = 8080;

const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

configureWebSocket(httpServer);
