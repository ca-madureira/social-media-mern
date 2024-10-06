import mongoose from 'mongoose';
import Post from '../models/post.model';

interface CreatePostData {
  content: string;
  author: mongoose.Types.ObjectId;
}

interface UpdatePostData {
  content: string;
  id: mongoose.Types.ObjectId;
}

interface UserPostsData {
  author: mongoose.Types.ObjectId;
}

interface PostById {
  id: mongoose.Types.ObjectId;
}

export const create = async (data: CreatePostData) => {
  const { content, author } = data;
  const newPost = new Post({ content, author });

  await newPost.save();

  return newPost;
};

export const getUserPostsService = async (data: UserPostsData) => {
  const { author } = data;
  const posts = await Post.find({ author })
    .populate('author', 'name email') // Popula os dados do autor
    .sort('-createdAt'); // Ordena por data de criação (mais recente primeiro)

  return posts;
};

export const deletePostByIdService = async (id: mongoose.Types.ObjectId) => {
  await Post.findByIdAndDelete(id);
};

export const updatePostByIdService = async (data: UpdatePostData) => {
  const { id, content } = data;

  // Atualiza o post pelo ID
  await Post.findByIdAndUpdate(id, { content });
};
