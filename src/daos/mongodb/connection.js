import mongoose from "mongoose";

const connectionString =
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
