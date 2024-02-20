import { Router } from "express";
import logger from "../utils/logger.js";

const router = Router();

// logger test
router.get("/loggerTest", (req, res) => {
  logger.debug("Debug message");
  logger.http("HTTP message");
  logger.info("Info message");
  logger.warning("Warning message");
  logger.error("Error message");
  logger.fatal("Fatal message");

  res.send("Check the console for logs.");
});

export default router;
