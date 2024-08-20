import mongoose from 'mongoose';
import { signToken } from '../middleware/auth';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  // avatar: string;
}

interface UserData {
  email: string;
  password: string;
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
  };
}

export const create = async (data: CreateUserData) => {
  const { name, email, password } = data;

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
    },
  };
};

export default create;
