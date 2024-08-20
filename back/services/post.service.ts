import mongoose from 'mongoose';
import Post from '../models/post.model';

interface CreatePostData {
  content: string;
  author: mongoose.Types.ObjectId;
}

interface UserPostsData {
  author: mongoose.Types.ObjectId;
}

// Função para criar um novo post

export const create = async (data: CreatePostData) => {
  const { content, author } = data;
  const newPost = new Post({ content, author });

  await newPost.save();

  return newPost; // Retorna o post recém-criado
};

// Função para recuperar os posts de um usuário
export const getUserPostsService = async (data: UserPostsData) => {
  const { author } = data;
  const posts = await Post.find({ author })
    .populate('author', 'name email') // Popula os dados do autor
    .sort('-createdAt'); // Ordena por data de criação (mais recente primeiro)

  return posts; // Retorna a lista de posts
};
