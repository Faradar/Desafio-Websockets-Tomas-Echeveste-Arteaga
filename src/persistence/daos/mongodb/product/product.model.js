import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
  status: { type: Boolean, default: true },
  title: { type: String, index: true },
  description: String,
  code: { type: String, unique: true },
  price: Number,
  stock: Number,
  category: { type: String, index: true },
  thumbnails: [String],
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model("products", productSchema);
