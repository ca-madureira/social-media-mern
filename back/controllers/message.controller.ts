import { Request, Response } from "express";
import { createMessageService } from "../services/message.service";

export const createMessage = async (req: Request, res: Response) => {
  const { senderId, receiverId, message } = req.body;

  try {
    const result = await createMessageService(senderId, receiverId, message);

    res.status(201).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao criar mensagem",
      error: error.message,
    });
  }
};
