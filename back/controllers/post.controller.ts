import { Request, Response } from 'express';
import create from '../services/post.service';

export const createPost = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    // Obtém o ID do usuário logado a partir do `req.user`
    const author = req.user?._id;

    // Passa o autor junto com o corpo da requisição para a função de criação
    const content = await create({ ...req.body, author });

    return res
      .status(201)
      .json({ message: 'Post criado com sucesso', content });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'Preencha os campos') {
        return res.status(400).json({ message: error.message });
      }
      if (error.message === 'User already exists') {
        return res.status(409).json({ message: error.message });
      }
    }
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar o post' });
  }
};
