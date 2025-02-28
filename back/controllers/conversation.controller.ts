import Conversation from "../models/conversation.model";
import { Request, Response } from "express";

export const getConversation = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?._id;
    const receiverId = req.params.id;

    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "Sender ID ou Receiver ID inválido." });
    }

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ message: "Conversa não encontrada." });
    }

    res.status(200).json(conversation);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao buscar a conversa", error: error.message });
  }
};
