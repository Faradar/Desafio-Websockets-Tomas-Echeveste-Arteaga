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
      throw new Error(error.message);
    }
  }

  async deleteChats() {
    try {
      await ChatModel.deleteMany({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
