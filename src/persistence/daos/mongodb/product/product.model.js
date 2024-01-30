import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
  status: { type: Boolean, default: true },
  title: { type: String, index: true, required: true },
  description: { type: String, required: true },
  code: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, index: true, required: true },
  thumbnails: [String],
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model("products", productSchema);
