import { Router } from "express";
import { devLogger, prodLogger } from "../utils/logger.js";

const router = Router();

// devLogger test
router.get("/loggerTest", (req, res) => {
  devLogger.debug("Debug message");
  devLogger.http("HTTP message");
  devLogger.info("Info message");
  devLogger.warning("Warning message");
  devLogger.error("Error message");
  devLogger.fatal("Fatal message");

  res.send("Check the console for logs.");
});

// prodLogger test
router.get("/loggerTest2", (req, res) => {
  try {
    throw new Error("This is a simulated error.");
  } catch (error) {
    prodLogger.error("Error in loggerTest2 route:", error);

    res.status(500).send("An error occurred. Check the logs for details.");
  }
});

export default router;
