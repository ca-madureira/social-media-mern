import { Request, Response } from 'express';
import create from '../services/user.service';
import { getUserPostsService } from '../services/post.service';
import mongoose from 'mongoose';

export const createPost = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    // Verifica se o usuário está logado e tem um ID válido
    const author = req.user?._id;
    if (!author) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    // Passa o autor junto com o corpo da requisição para a função de criação
    const newPost = await create({ ...req.body, author });

    return res
      .status(201)
      .json({ message: 'Post criado com sucesso', post: newPost });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar o post' });
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    // Obtém o ID do usuário logado a partir do `req.user`
    const author = req.user?._id;

    if (!author) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    // Converte o ID para ObjectId se necessário
    let authorObjectId: mongoose.Types.ObjectId;

    if (typeof author === 'string') {
      if (mongoose.Types.ObjectId.isValid(author)) {
        authorObjectId = new mongoose.Types.ObjectId(author);
      } else {
        return res.status(400).json({ message: 'ID de usuário inválido' });
      }
    } else if (author instanceof mongoose.Types.ObjectId) {
      authorObjectId = author;
    } else {
      return res.status(400).json({ message: 'ID de usuário inválido' });
    }

    // Recupera os posts do usuário
    const posts = await getUserPostsService({ author: authorObjectId });

    return res
      .status(200)
      .json({ message: 'Posts retornados com sucesso', posts });
  } catch (error: unknown) {
    console.error('Erro ao retornar os posts:', error);
    return res.status(500).json({ message: 'Erro ao retornar os posts' });
  }
};
