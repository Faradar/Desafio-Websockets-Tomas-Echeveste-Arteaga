import MongoDao from "../mongo.dao.js";
import { ChatModel } from "./chat.model.js";

export default class ChatDaoMongoDB extends MongoDao {
  constructor() {
    super(ChatModel);
  }

  // async getChats() {
  //   try {
  //     const response = await ChatModel.find({});
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching chats:", error);
  //     throw error;
  //   }
  // }

  // async getChatById(id) {
  //   try {
  //     const response = await ChatModel.findById(id);
  //     return response;
  //   } catch (error) {
  //     console.error(`Error getting chat with ${id} id:`, error);
  //     throw error;
  //   }
  // }

  // async createChat(obj) {
  //   try {
  //     const response = await ChatModel.create(obj);
  //     return response;
  //   } catch (error) {
  //     console.error("Error creating chat:", error);
  //     throw error;
  //   }
  // }

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

  // async deleteChatById(id) {
  //   try {
  //     const response = await ChatModel.findByIdAndDelete(id);
  //     return response;
  //   } catch (error) {
  //     console.error(`Error deleting ${id} chat: ${error}`);
  //     throw error;
  //   }
  // }
}
