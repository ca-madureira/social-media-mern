import mongoose from 'mongoose';
import { signToken } from '../middleware/token';
import User from '../models/user.model';
import Post from '../models/post.model';
import bcrypt from 'bcryptjs';
import { converteBase64 } from '../utils/converteBase64';
import jwt from 'jsonwebtoken';

interface UserDataSearch {
  name: string;
  email: string;
}

export const deleteUserByIdService = async (id: string) => {
  await Post.deleteMany({ author: id });
  await User.findByIdAndDelete(id);
};

export const searchUserService = async (data: UserDataSearch) => {
  const { name, email } = data;

  // Verifica se o termo de pesquisa está vazio ou é uma string vazia
  const nameRegex = name ? `^${name}` : '';
  const emailRegex = email ? `^${email}` : '';

  // Busca usuários com nome ou email que começam com o termo digitado
  const users = await User.find({
    $or: [
      { name: { $regex: nameRegex, $options: 'i' } },
      { email: { $regex: emailRegex, $options: 'i' } },
    ],
  })
    .select('name email friends') // Seleciona o nome, email e os amigos
    .populate({
      path: 'friends', // Campo que está sendo populado
      select: 'name email', // Campos que você quer retornar dos amigos
    });
  // Retorna apenas os campos name, email e _id (por padrão)
  console.log(users);
  return users;
};
