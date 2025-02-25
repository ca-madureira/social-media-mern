import { Request, Response } from "express";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import mongoose from "mongoose";

export const createMessage = async (req: Request, res: Response) => {
  const { message } = req.body;
  const senderId = req.user?._id;
  const receiverId = req.params.id;

  try {
    // Encontrar a conversa existente
    let conversation = await Conversation.findOne({
      members: {
        $all: [senderId, receiverId],
      },
    });

    // Se não existir, criar uma nova conversa
    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
    }

    // Criar uma nova mensagem
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Salvar a nova mensagem no banco de dados
    await newMessage.save();

    // Adicionar a nova mensagem à conversa
    conversation.messages.push(newMessage._id as mongoose.Types.ObjectId);

    // Salvar a conversa com a nova mensagem
    await conversation.save();

    // Responder com a nova mensagem
    res.status(201).json({
      message: "Mensagem criada com sucesso",
      newMessage,
      conversation,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao criar mensagem",
      error: error.message,
    });
  }
};
