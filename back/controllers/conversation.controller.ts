import { Request, Response } from "express";
import {
  getAllUserConversationsService,
  getConversationBetweenUsersService,
} from "../services/conversation.service";
import mongoose from "mongoose";

export const getAllUserConversations = async (req: Request, res: Response) => {
  try {
    const user = req.user?._id as mongoose.Types.ObjectId;

    const conversations = await getAllUserConversationsService(user.toString());

    return res.status(200).json(conversations);
  } catch (error: any) {
    console.error("Erro ao buscar as conversas:", error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar as conversas", error: error.message });
  }
};

export const getConversationBetweenUsers = async (
  req: Request,
  res: Response
) => {
  const { senderId, receiverId } = req.body;
  try {
    const conversation = await getConversationBetweenUsersService({
      senderId,
      receiverId,
    });

    res.status(200).json(conversation);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao buscar a conversa", error: error.message });
  }
};
