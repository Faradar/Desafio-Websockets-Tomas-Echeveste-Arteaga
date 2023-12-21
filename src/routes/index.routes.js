import { Router } from "express";
import productRouter from "./product.routes.js";
import cartRouter from "./cart.routes.js";
import sessionRouter from "./session.routes.js";

const router = Router();

router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/sessions", sessionRouter);

export default router;
