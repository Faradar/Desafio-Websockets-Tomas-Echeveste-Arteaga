import winston from "winston";
import { __dirname } from "./utils.js";
import config from "../config/config.js";

const levels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const colors = {
  debug: "blue",
  http: "green",
  info: "cyan",
  warning: "yellow",
  error: "red",
  fatal: "magenta",
};

winston.addColors(colors);

let logger;

if (config.LOGGER === "dev") {
  // devLogger
  logger = winston.createLogger({
    levels,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: "MM-DD-YYYY HH:mm:ss",
      }),
      winston.format.printf(
        (info) => `${info.level} | ${[info.timestamp]} | ${info.message}`
      )
    ),
    transports: [new winston.transports.Console({ level: "debug" })],
  });
} else {
  // prodLogger
  logger = winston.createLogger({
    levels,
    format: winston.format.combine(
      winston.format.timestamp({
        format: "MM-DD-YYYY HH:mm:ss",
      }),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console({ level: "info" }),
      new winston.transports.File({
        filename: __dirname + "/logs/errors.log",
        level: "error",
      }),
    ],
  });
}

export default logger;
