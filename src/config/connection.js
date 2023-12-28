import { connect } from "mongoose";
import MongoStore from "connect-mongo";
import "dotenv/config";
import config from "./config.js";

export const connectionString = config.MONGO_URL;

export const initMongoDB = async () => {
  try {
    await connect(connectionString);
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};

export const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: connectionString,
    ttl: 120,
    crypto: {
      secret: "1234",
    },
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 120000,
  },
};
