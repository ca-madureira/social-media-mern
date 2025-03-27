import express from "express";
import {
  getConversationBetweenUsers,
  getAllUserConversations,
} from "../controllers/conversation.controller";
import { isAuthenticatedToken } from "../middleware/token";

const conversationRoute = express.Router();

conversationRoute.post("/", getConversationBetweenUsers);
conversationRoute.get(
  "/friends",
  isAuthenticatedToken,
  getAllUserConversations
);

export default conversationRoute;
