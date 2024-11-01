import { Request, Response } from 'express';
import { create, deletePostByIdService } from '../services/post.service';
import {
  getUserPostsService,
  updatePostByIdService,
} from '../services/post.service';
import mongoose from 'mongoose';
import Post from '../models/post.model';

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

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    // Obtém o ID do usuário a partir dos parâmetros da URL
    const { id } = req.params;

    // Verifica se o ID é válido (opcional, mas boa prática)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de usuário inválido' });
    }

    // Converte o ID para ObjectId
    const authorObjectId = new mongoose.Types.ObjectId(id);

    // Recupera os posts do usuário
    const posts = await Post.find({ author: authorObjectId })
      .populate('author', 'name email')
      .sort('-createdAt');

    return res
      .status(200)
      .json({ message: 'Posts retornados com sucesso', posts });
  } catch (error) {
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

export const votePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId; // ID do usuário logado
    const postId = req.params.id; // Certifique-se de que o parâmetro é `id`

    // Valida se o ID do post é um ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'ID de post inválido' });
    }

    // Verifica se o post existe
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    // Verifica se o usuário já votou neste post
    const alreadyVoted = post.votes.some((voterId) => voterId.equals(userId));

    if (alreadyVoted) {
      // Se já votou, remove o voto
      post.votes = post.votes.filter((voterId) => !voterId.equals(userId));
    } else {
      // Se ainda não votou, adiciona o voto
      post.votes.push(userId);
    }

    // Salva as mudanças no post
    await post.save();

    return res.status(200).json({
      message: alreadyVoted
        ? 'Voto removido com sucesso'
        : 'Voto adicionado com sucesso',
      votes: post.votes.length, // Retorna o número atualizado de votos
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao processar o voto', error });
  }
};

export const reactToPost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId; // ID do usuário logado
    const { reaction } = req.body; // Extrai a reação do corpo da requisição
    const postId = req.params.id;

    console.log('Post ID:', postId);
    console.log('User ID:', userId);
    console.log('Reaction:', reaction);

    // Valida o postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'ID de post inválido' });
    }

    // Busca o post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    console.log('Post encontrado:', post);

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Garante que os arrays existam
    post.reactions.happy = post.reactions.happy || [];
    post.reactions.sad = post.reactions.sad || [];

    // Remove a reação existente, se houver
    post.reactions.happy = post.reactions.happy.filter(
      (user) => !user.equals(userObjectId),
    );
    post.reactions.sad = post.reactions.sad.filter(
      (user) => !user.equals(userObjectId),
    );

    console.log('Reações após remoção:', post.reactions);
    console.log('verificando... happy', post.reactions.happy);
    console.log('verificando...sad', post.reactions.sad);

    // Aplica a nova reação
    if (reaction === 'happy') {
      if (!post.reactions.happy.some((user) => user.equals(userObjectId))) {
        post.reactions.happy.push(userObjectId); // Adiciona 'happy'
        console.log('Usuário reagiu com "happy"', post.reactions.happy);
      }
    } else if (reaction === 'sad') {
      if (!post.reactions.sad.some((user) => user.equals(userObjectId))) {
        post.reactions.sad.push(userObjectId); // Adiciona 'sad'
        console.log('Usuário reagiu com "sad"', post.reactions.sad);
      }
    } else if (reaction !== 'none') {
      return res.status(400).json({ message: 'Reação inválida' });
    }

    // Salva o post atualizado
    await post.save();
    console.log('Post salvo com reações atualizadas:', post.reactions);

    return res.status(200).json({
      message: 'Reação atualizada com sucesso',
      reactions: post.reactions,
    });
  } catch (error) {
    console.error('Erro ao reagir ao post:', error);
    return res.status(500).json({ message: 'Erro ao reagir ao post', error });
  }
};

export const userVotedPost = async (req: Request, res: Response) => {
  try {
    const author = req.user?._id;
    const { id } = req.params; // Extraímos 'id' de req.params

    // Chamando o serviço para deletar o post
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    // Verifica se o autor já votou (supondo que post.votes seja um array de ObjectIds ou strings)
    const voted = post.votes.some((vote) =>
      vote.equals(author as mongoose.Types.ObjectId),
    );

    res.status(200).json({ voted });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao deletar post',
      error: error.message,
    });
  }
};
