import Daos from "../class.dao.js";
import { ChatModel } from "./chat.model.js";

export default class ChatDaoMongoDB extends Daos {
  constructor() {
    super(ChatModel);
  }

  async updateChat(id, obj) {
    try {
      const response = await ChatModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.error(`Error updating ${id} chat: ${error}`);
      throw error;
    }
  }

  async deleteChats() {
    try {
      await ChatModel.deleteMany({});
      console.log("Chats deleted successfully");
    } catch (error) {
      console.error("Error deleting all chats:", error);
      throw error;
    }
  }
}
