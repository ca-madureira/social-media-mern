import { Server } from "socket.io";

// Define the User interface
interface User {
  userId: string;
  socketId: string;
}

// Initialize the server with the correct CORS configuration
const io = new Server({
  cors: {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST"], // Allowed HTTP methods
  },
});

// Explicitly type the onlineUsers array
let onlineUsers: User[] = [];

io.on("connection", (socket) => {
  console.log("nova conexao", socket.id);

  socket.on("addNewUser", (userId: string) => {
    console.log(onlineUsers);
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on(
    "sendMessage",
    (message: { senderId: string; recipientId: string; content: string }) => {
      const user = onlineUsers.find(
        (user) => user.userId === message.recipientId
      );

      if (user) {
        io.to(user.socketId).emit("getMessage", message);
        io.to(user.socketId).emit("getNotification", {
          senderId: message.senderId,
          isRead: false,
          date: new Date(),
        });
        console.log("mensagem enviada");
      }
    }
  );

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(5000);
