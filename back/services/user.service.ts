import mongoose from 'mongoose';
import { signToken } from '../middleware/auth';
import User from '../models/user.model';
import Post from '../models/post.model';
import bcrypt from 'bcryptjs';
import { converteBase64 } from '../utils/converteBase64';
import jwt from 'jsonwebtoken';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  avatar: File;
}

interface UserData {
  email: string;
  password: string;
}

interface UserDataSearch {
  name: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthServiceResponse {
  token: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
}

interface UserDelete {
  id: string;
}

export const create = async (data: CreateUserData) => {
  const { name, email, password } = data;

  // const image = converteBase64(avatar);

  if (
    !name ||
    !email ||
    !password ||
    name === '' ||
    email === '' ||
    password === ''
  ) {
    throw new Error('All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // let myCloud;
  // try {
  //   myCloud = await cloudinary.v2.uploader.upload(avatar, {
  //     folder: 'avatar',
  //   });
  // } catch (error) {
  //   throw new Error('Failed to upload image');
  // }

  // const picture = {
  //   image: {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   },
  // };

  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  const token = signToken(newUser);

  return { user: newUser, token };
};

export const loginService = async (
  credentials: LoginCredentials,
): Promise<AuthServiceResponse | null> => {
  const { email, password } = credentials;

  // Encontrar o usuário pelo e-mail
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  console.log(user);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('senha', isPasswordValid);
  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas');
  }

  // Gerar o token JWT
  const token = signToken(user);

  return {
    token,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  };
};

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
  }).select('name email'); // Retorna apenas os campos name, email e _id (por padrão)
  console.log(users);
  return users;
};

export default create;
