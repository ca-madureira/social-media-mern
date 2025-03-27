import Conversation from "../models/conversation.model";
import mongoose from "mongoose";

interface MembersParams {
  senderId: string;
  receiverId: string;
}

interface SenderParams {
  sender: mongoose.Types.ObjectId;
}

export const getConversationBetweenUsersService = async (
  data: MembersParams
) => {
  const { senderId, receiverId } = data;

  if (!senderId || !receiverId)
    throw new Error("Sender ID ou Receiver ID inválido.");

  const conversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!conversation) throw new Error("nenhuma conversa encontrada");

  return conversation;
};

export const getAllUserConversationsService = async (user: string) => {
  if (!mongoose.Types.ObjectId.isValid(user)) {
    throw new Error("ID de usuário inválido ou nao autenticado");
  }

  const conversations = await Conversation.find({
    members: user,
  }).populate({
    path: "lastMessage",
    populate: {
      path: "receiverId",
      model: "User",
    },
  });

  if (!conversations || conversations.length === 0) {
    throw new Error("conversas não encontradas");
  }

  return conversations;
};
