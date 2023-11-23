import MessageDaoMongoDB from "../daos/mongodb/message.dao.js";

const msgDao = new MessageDaoMongoDB();

export const getMessages = async () => {
  try {
    const mensajes = await msgDao.getMessages();
    return mensajes;
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = async (msg) => {
  try {
    const mensaje = await msgDao.createMessage(msg);
    return mensaje;
  } catch (error) {
    console.log(error);
  }
};
