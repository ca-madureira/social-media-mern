import express from "express";
import {
  getConversation,
  deleteConversation,
} from "../controllers/conversation.controller";

const conversationRoute = express.Router();

conversationRoute.get("/", getConversation);
conversationRoute.delete("/:id", deleteConversation);

export default conversationRoute;
