import Conversation from "../models/conversation.model";
import mongoose from "mongoose";
import User from "../models/user.model"; // Para obter dados do usuário (nome, avatar)
import Message from "../models/message.model"; // Para obter a última mensagem

interface MembersParams {
  senderId: string;
  receiverId: string;
}

// Função para obter uma conversa entre dois usuários
export const getConversationBetweenUsersService = async (
  data: MembersParams
) => {
  const { senderId, receiverId } = data;

  if (!senderId || !receiverId) {
    throw new Error("Sender ID ou Receiver ID inválido.");
  }

  // Encontrar a conversa entre os dois usuários
  const conversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  }).populate("messages lastMessage");

  if (!conversation) {
    return null; // Caso a conversa não exista, retorna null
  }

  // Obter o usuário que não é o logado
  const otherUserId = conversation.members[0].toString() === senderId ? conversation.members[1] : conversation.members[0];

  // Buscar os dados do outro usuário (nome, avatar)
  const otherUser = await User.findById(otherUserId);

  if (!otherUser) {
    throw new Error("Usuário não encontrado.");
  }

  // Preparar os dados da conversa, incluindo o nome e avatar do outro usuário
  const conversationData = {
    ...conversation.toObject(),
    otherUser: {
      id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar,
    },
    lastMessage: conversation.lastMessage || null, // Inclui a última mensagem (se existir)
  };

  return conversationData;
};

// Função para obter todas as conversas de um usuário
export const getAllUserConversationsService = async (userId: string) => {
  const conversations = await Conversation.find({
    members: userId
  }).populate({
    path: "lastMessage",
    populate: [
      {
        path: "receiverId",
        select: "name avatar",
        match: { _id: { $ne: userId } }, // Se receiverId for o userId, não traz nada
      },
      {
        path: "senderId",
        select: "name avatar",
        match: { _id: { $ne: userId } }, // Se senderId for o userId, não traz nada
      }
    ],
  });

  return conversations;
};
