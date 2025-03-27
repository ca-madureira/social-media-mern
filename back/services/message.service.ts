import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import mongoose from "mongoose";

export const createMessageService = async (
  senderId: string,
  receiverId: string,
  message: string
) => {
  try {
    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    await newMessage.save();

    conversation.messages.push(newMessage._id as mongoose.Types.ObjectId);
    conversation.lastMessage = newMessage._id as mongoose.Types.ObjectId;

    await conversation.save();

    return {
      message: "Mensagem criada com sucesso",
      newMessage,
      conversation,
    };
  } catch (error: any) {
    throw new Error(`Erro ao criar mensagem: ${error.message}`);
  }
};
