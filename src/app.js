import express from "express";
import ApiRouter from "./routes/index.routes.js";
import viewRoutes from "./routes/views.routes.js";
import productWebSocket from "./websockets/product.websockets.js";
import chatWebSocket from "./websockets/chat.websockets.js";
import handlebars from "express-handlebars";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./passport/local.strategies.js";
import "./passport/github.strategies.js";
import "./passport/google.strategies.js";
import { Server } from "socket.io";
import { __dirname } from "./utils/utils.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { mongoStoreOptions } from "./config/connection.js";
import config from "./config/config.js";
import logger from "./utils/logger.js";
import info from "./docs/info.js";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const specs = swaggerJSDoc(info);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(config.SECRET_COOKIES));
app.use(morgan("dev"));
app.use(session(mongoStoreOptions));

// Handlebars
const hbs = handlebars.create({
  helpers: {
    isInArray: function (value, array) {
      return array && array.includes(value);
    },
    ifAdmin: function (user, options) {
      if (user.role === "admin") {
        // If the user is an admin, render the link to the users page
        return options.fn(this);
      } else {
        // If the user is not an admin, render the link to the cart
        return options.inverse(this);
      }
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
const apiRoutes = new ApiRouter();
app.use("/api", apiRoutes.getRouter());
app.use("/", viewRoutes);

// Middleware
app.use(errorHandler);

// Server
const port = config.PORT || 8080;
const httpServer = app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

// Websockets
const io = new Server(httpServer);
const productNamespace = io.of("/product");
const chatNamespace = io.of("/chat");
productWebSocket(productNamespace);
chatWebSocket(chatNamespace);

export default app;
