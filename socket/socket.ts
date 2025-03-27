import { Server } from "socket.io";

interface User {
  userId: string;
  socketId: string;
}

const io = new Server({
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});

let activeUsers: User[] = [];

io.on("connection", (socket) => {
  console.log("Novo usuário conectado:", socket.id);

  socket.on("new-user-add", (newUserId: string) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      io.emit("get-users", activeUsers);
      console.log("lista de usuarios online", activeUsers);
    }
  });

  socket.on("user-disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);

    console.log("Usuários ativos após desconexão:", activeUsers);
  });

  socket.on("send-message", ({ senderId, receiverId, message }) => {
    const receiver = activeUsers.find((user) => user.userId === receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("receive-message", { senderId, message });
    }
  });
});

io.listen(5000);
