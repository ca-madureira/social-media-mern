import Conversation from "../models/conversation.model";
import { Request, Response } from "express";

export const getConversation = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?._id;
    const receiverId = req.params.id;

    // Validação: Verifica se o senderId e o receiverId são válidos
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "Sender ID ou Receiver ID inválido." });
    }

    // Procurar pela conversa com ambos os membros
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    // Verificar se a conversa foi encontrada
    if (!conversation) {
      return res.status(404).json({ message: "Conversa não encontrada." });
    }

    // Retornar a conversa encontrada
    res.status(200).json(conversation);
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao buscar a conversa", error: error.message });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const senderId = req.user?._id; // ID do usuário autenticado
    const receiverId = req.params.id; // ID do destinatário passado na URL

    // Verificar se senderId e receiverId estão presentes
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "Sender ID ou Receiver ID inválido." });
    }

    // Encontrar a conversa a ser excluída
    const conversation = await Conversation.findOneAndDelete({
      members: { $all: [senderId, receiverId] },
    });

    // Verificar se a conversa foi encontrada e excluída
    if (!conversation) {
      return res.status(404).json({ message: "Conversa não encontrada." });
    }

    // Retornar sucesso na exclusão
    res.status(200).json({ message: "Conversa excluída com sucesso." });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao excluir a conversa", error: error.message });
  }
};
