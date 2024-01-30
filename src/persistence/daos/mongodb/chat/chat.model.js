import { Schema, model } from "mongoose";

const chatSchema = new Schema({
  username: String,
  message: String,
});

export const ChatModel = model("chat", chatSchema);
