import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://admin:admin@codercluster.q1e5hd6.mongodb.net/ecommerce?retryWrites=true&w=majority";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};
