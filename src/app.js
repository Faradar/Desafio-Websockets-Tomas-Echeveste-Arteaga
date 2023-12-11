import express from "express";
import handlebars from "express-handlebars";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./passport/strategies.js";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import { productWebSocket } from "./websockets/product.websocket.js";
import { chatWebSocket } from "./websockets/chat.websocket.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initMongoDB } from "./daos/mongodb/connection.js";
import { mongoStoreOptions } from "./daos/mongodb/connection.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";
import sessionRouter from "./routes/session.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(session(mongoStoreOptions));

// Handlebars
const hbs = handlebars.create({
  helpers: {
    isInArray: function (value, array) {
      return array && array.includes(value);
    },
  },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionRouter);
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

// Websockets
const io = new Server(httpServer);
const productNamespace = io.of("/product");
const chatNamespace = io.of("/chat");
productWebSocket(productNamespace);
chatWebSocket(chatNamespace);
