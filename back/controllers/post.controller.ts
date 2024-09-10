import { Request, Response } from 'express';
import { create, deletePostByIdService } from '../services/post.service';
import {
  getUserPostsService,
  updatePostByIdService,
} from '../services/post.service';
import mongoose from 'mongoose';

export const createPost = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    //Verifica se o usuário está logado e tem um ID válido
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

export const deletePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extraímos 'id' de req.params

    // Convertendo 'id' para ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Chamando o serviço para deletar o post
    await deletePostByIdService(objectId);

    res.status(200).json({ success: true, message: `Post deletado` });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar post',
      error: error.message,
    });
  }
};

export const updatePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extraímos 'id' de req.params

    // Verifica se o ID é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'ID inválido' });
    }

    // Chamando o serviço para atualizar o post
    await updatePostByIdService({ id, ...req.body });

    res.status(200).json({ success: true, message: 'Post atualizado' });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar o post',
      error: error.message,
    });
  }
};
