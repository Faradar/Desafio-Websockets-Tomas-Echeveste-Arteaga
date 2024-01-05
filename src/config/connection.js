import { connect } from "mongoose";
import MongoStore from "connect-mongo";
import config from "./config.js";

const connectionString = config.MONGO_URL;

export class ConnectMongoDB {
  static #instance;

  constructor() {
    connect(connectionString);
  }

  static getInstance() {
    if (this.#instance) {
      console.log("You are already connected to MongoDB");
      return this.#instance;
    } else {
      this.#instance = new ConnectMongoDB();
      console.log("Connected to MongoDB!");
      return this.#instance;
    }
  }
}

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
