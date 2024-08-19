import Post from '../models/post.model';
import mongoose from 'mongoose';

interface CreatePostData {
  content: string;

  author: mongoose.Types.ObjectId;
}

const create = async (data: CreatePostData) => {
  const { content, author } = data;
  const newPost = new Post({ content, author });

  await newPost.save();

  return newPost; // Retornando o post diretamente
};

export default create;
