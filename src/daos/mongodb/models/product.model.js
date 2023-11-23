import { Schema, model } from "mongoose";

export const productCollectionName = "products";

const productSchema = new Schema({
  status: { type: Boolean, default: true },
  title: String,
  description: String,
  code: { type: String, unique: true },
  price: Number,
  stock: Number,
  category: String,
  thumbnails: [String],
});

export const ProductModel = model(productCollectionName, productSchema);
