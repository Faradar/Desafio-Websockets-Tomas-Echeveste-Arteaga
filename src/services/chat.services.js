import Services from "./class.services.js";
import ChatDaoMongoDB from "../daos/mongodb/chat/chat.dao.js";
const chatDao = new ChatDaoMongoDB();

export default class ChatService extends Services {
  constructor() {
    super(chatDao);
  }
}

// export const getChats = async () => {
//   try {
//     const msgs = await chatDao.getAll();
//     return msgs;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createChat = async (chat) => {
//   try {
//     const msg = await chatDao.create(chat);
//     return msg;
//   } catch (error) {
//     console.log(error);
//   }
// };
