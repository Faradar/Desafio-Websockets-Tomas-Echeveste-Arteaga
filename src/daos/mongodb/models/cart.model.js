import { Schema, model } from "mongoose";

export const cartCollectionName = "carts";

const productInCartSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

const cartSchema = new Schema({
  products: [productInCartSchema],
});

export const CartModel = model(cartCollectionName, cartSchema);
