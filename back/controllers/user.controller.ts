import { NextFunction, Request, Response } from 'express';
import { signToken } from '../middleware/token';
import bcrypt from 'bcryptjs';

import mongoose, { mongo } from 'mongoose';
import createToken from '../middleware/createToken';
import PasswordResetToken from '../models/passwordReset.model';

import { deleteUserByIdService } from '../services/user.service';
import User, { IUser } from '../models/user.model';
import { searchUserService } from '../services/user.service';
import Post from '../models/post.model';
import transport from '../middleware/sendMail';

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Obtém o 'id' da URL

    // Verifica se o usuário autenticado é o mesmo que está tentando deletar a conta
    //   const userId = req.user?._id.toString();
    // console.log('User ID from request:', req.user?._id.toHexString());
    console.log('ID from URL params:', id);

    // if (userId !== id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Você só pode deletar sua própria conta',
    //   });
    // }

    await deleteUserByIdService(id);

    return res
      .status(200)
      .json({ success: true, message: 'Usuário deletado com sucesso' });
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao deletar usuário',
      error: error.message,
    });
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    // Convert query parameters to strings or provide default empty strings
    const name = (req.query.name as string) || '';
    const email = (req.query.email as string) || '';

    // Await the result from searchUserService
    const users = await searchUserService({ name, email });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};
