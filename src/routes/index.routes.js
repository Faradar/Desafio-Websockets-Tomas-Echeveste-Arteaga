import { Router } from "express";
import productRouter from "./product.routes.js";
import cartRouter from "./cart.routes.js";
import sessionRouter from "./session.routes.js";

export default class ApiRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  initRoutes() {
    this.router.use("/products", productRouter);
    this.router.use("/carts", cartRouter);
    this.router.use("/sessions", sessionRouter);
  }

  getRouter() {
    return this.router;
  }
}
