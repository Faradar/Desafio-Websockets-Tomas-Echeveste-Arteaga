import * as service from "../services/chat.services.js";

function chatWebSocket(chatNamespace) {
  chatNamespace.on("connection", async (socket) => {
    console.log(`🟢 User ${socket.id} connected to the chat`);
    chatNamespace.emit("messages", await service.getMessages());

    socket.on("newUser", (user) => {
      console.log(`👤 User ${user} has logged on`);
    });

    socket.on("chat:message", async (data) => {
      await service.createMessage(data);
      chatNamespace.emit("messages", await service.getMessages());
    });

    socket.on("newUser", (user) => {
      socket.broadcast.emit("newUser", user);
    });

    socket.on("chat:typing", (user) => {
      socket.broadcast.emit("chat:typing", user);
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User ${socket.id} disconnected from the chat`);
    });
  });
}

export default chatWebSocket;
