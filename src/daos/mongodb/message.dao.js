import { MessageModel } from "./models/message.model.js";

export default class MessageDaoMongoDB {
  async getMessages() {
    try {
      const response = await MessageModel.find({});
      return response;
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  async getMessageById(id) {
    try {
      const response = await MessageModel.findById(id);
      return response;
    } catch (error) {
      console.error(`Error getting message with ${id} id:`, error);
    }
  }

  async createMessage(obj) {
    try {
      const response = await MessageModel.create(obj);
      return response;
    } catch (error) {
      console.error("Error creating message:", error);
    }
  }

  async updateMessage(id, obj) {
    try {
      const response = await MessageModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.error(`Error updating ${id} message: error`);
    }
  }

  async deleteMessages() {
    try {
      await MessageModel.deleteMany({});
      console.log("Messages deleted successfully");
    } catch (error) {
      console.error("Error deleting all messages:", error);
    }
  }

  async deleteMessageById(id) {
    try {
      const response = await MessageModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.error(`Error deleting ${id} message: ${error}`);
    }
  }
}
