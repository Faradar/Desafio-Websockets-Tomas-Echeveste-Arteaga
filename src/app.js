import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import { __dirname } from "./utils.js";
import { configureWebSocket } from "./websocket.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./daos/mongodb/connection.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

// Middleware
app.use(errorHandler);

// Persistence
const persistence = "MONGO";
if (persistence === "MONGO") await initMongoDB();

// Server
const port = 8080;
const httpServer = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

configureWebSocket(httpServer);
