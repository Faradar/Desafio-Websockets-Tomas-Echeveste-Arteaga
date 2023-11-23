import { Router } from "express";
import * as controller from "../controllers/views.controllers.js";

const router = Router();

router.get("/", controller.home);

router.get("/realtimeproducts", controller.realTimeProducts);

router.get("/chat", controller.chat);

export default router;
