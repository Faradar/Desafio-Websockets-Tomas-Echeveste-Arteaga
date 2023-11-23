import { Schema, model } from "mongoose";

export const messageCollectionName = "messages";

const messageSchema = new Schema({
  username: String,
  message: String,
});

export const MessageModel = model(messageCollectionName, messageSchema);

// match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Has to be an email
