import mongoose from "mongoose";
import MongoStore from "connect-mongo";

export const connectionString =
  "mongodb+srv://admin:admin@codercluster.q1e5hd6.mongodb.net/ecommerce?retryWrites=true&w=majority";

// const connectionCompass = "mongodb://127.0.0.1:27017/ecommerce"; // Compass connection

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
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
