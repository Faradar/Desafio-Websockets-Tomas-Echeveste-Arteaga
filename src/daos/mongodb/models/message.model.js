import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  username: String,
  message: String,
});

export const MessageModel = model("messages", messageSchema);
