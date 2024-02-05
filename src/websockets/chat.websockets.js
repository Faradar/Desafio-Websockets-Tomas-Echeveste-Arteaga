import { devLogger } from "../utils/logger.js";
import ChatService from "../services/chat.services.js";
const service = new ChatService();

function chatWebSocket(chatNamespace) {
  chatNamespace.on("connection", async (socket) => {
    devLogger.info(`🟢 User ${socket.id} connected to the chat`);
    chatNamespace.emit("messages", await service.getAll());

    socket.on("newUser", (user) => {
      devLogger.info(`👤 User ${user} has logged on`);
    });

    socket.on("chat:message", async (data) => {
      await service.create(data);
      chatNamespace.emit("messages", await service.getAll());
    });

    socket.on("newUser", (user) => {
      socket.broadcast.emit("newUser", user);
    });

    socket.on("chat:typing", (user) => {
      socket.broadcast.emit("chat:typing", user);
    });

    socket.on("disconnect", () => {
      devLogger.info(`🔴 User ${socket.id} disconnected from the chat`);
    });
  });
}

export default chatWebSocket;
