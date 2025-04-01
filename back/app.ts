require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import postRoute from "./routes/postRoute";
import messageRoute from "./routes/message.route";
import authRouter from "./routes/auth.route";

import conversationRoute from "./routes/conversation.route";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.use("/user", userRouter);
app.use("/posts", postRoute);
app.use("/auth", authRouter);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
