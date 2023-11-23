import { Server } from "socket.io";
import * as service from "../services/chat.services.js";

export function chatWebSocket(httpServer) {
  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    console.log(`🟢 User connected ${socket.id}`);
    io.emit("messages", await service.getMessages());

    socket.on("newUser", (user) => {
      console.log(`👤 User ${user} has logged on`);
    });

    socket.on("chat:message", async (data) => {
      await service.createMessage(data);
      io.emit("messages", await service.getMessages());
    });

    socket.on("newUser", (user) => {
      socket.broadcast.emit("newUser", user);
    });

    socket.on("chat:typing", (user) => {
      socket.broadcast.emit("chat:typing", user);
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User disconnected ${socket.id}`);
    });
  });
}
