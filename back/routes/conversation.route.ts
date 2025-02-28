import express from "express";
import { getConversation } from "../controllers/conversation.controller";

const conversationRoute = express.Router();

conversationRoute.get("/", getConversation);

export default conversationRoute;
