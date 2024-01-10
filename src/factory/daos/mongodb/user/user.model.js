import { Schema, model } from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  isGithub: {
    type: Boolean,
    default: false,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = model("users", userSchema);
