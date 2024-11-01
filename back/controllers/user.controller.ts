import { NextFunction, Request, Response } from 'express';
import { signToken } from '../middleware/token';
import bcrypt from 'bcryptjs';

import mongoose, { mongo } from 'mongoose';
import createToken from '../middleware/createToken';
import PasswordResetToken from '../models/passwordReset.model';
import cloudinary from '../utils/cloudinary';

import { deleteUserByIdService } from '../services/user.service';
import User, { IUser } from '../models/user.model';
import {
  searchUserService,
  sendInviteService,
  allInvitesService,
  acceptInviteService,
  allFriendsService,
  getFriendPostsService,
  declineInviteService,
} from '../services/user.service';
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

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate(
      'friends invites',
      'name email',
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Aqui, o avatar já estará incluído
    return res.status(200).json(user);
  } catch (error: unknown) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const sendInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const friendId = req.params.id;

    console.log('usuario logado', userId, 'usuario para convite', friendId);

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    // Converte userId para string antes de passar para o serviço
    const friend = await sendInviteService(userId.toString(), friendId);

    return res
      .status(200)
      .json({ message: 'Convite enviado com sucesso', friend });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || 'Erro ao enviar o convite' });
  }
};

export const allInvites = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    console.log('USUARIO:', id); // Para debugging

    const invites = await allInvitesService(id);

    return res.status(200).json({ invites });
  } catch (error: any) {
    console.error('Error retrieving invites:', error);
    return res
      .status(500)
      .json({ message: 'Erro ao recuperar convites', error: error.message });
  }
};

export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const inviterId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    // Converte userId para string antes de passar para o serviço
    const user = await acceptInviteService(userId.toString(), inviterId);

    return res.status(200).json({ message: 'Convite aceito com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao aceitar o convite' });
  }
};

export const declineInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const inviterId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    // Converte userId para string antes de passar para o serviço
    const user = await declineInviteService(userId.toString(), inviterId);

    return res.status(200).json({ message: 'Convite recusado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao recusar o convite' });
  }
};

export const allFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const friends = await allFriendsService(userId.toString());
    return res.status(200).json({ friends });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao recuperar amigos' });
  }
};

// export const handleImageUpload = async (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).json({
//       success: false,
//       message: 'Nenhum arquivo enviado',
//     });
//   }

//   try {
//     // Fazer upload da imagem para o Cloudinary
//     const result = await imageUploadUtil(req.file.buffer);

//     // Verifica se o usuário está autenticado
//     if (!req.user) {
//       return res.status(401).json({ message: 'Usuário não autenticado' });
//     }

//     const userId = req.user._id;

//     // Atualiza o campo avatar do usuário com a URL da imagem
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { avatar: result.secure_url }, // Atualiza o campo avatar com a URL da imagem
//       { new: true },
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'Usuário não encontrado' });
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'Avatar atualizado com sucesso',
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error('Erro ao atualizar avatar:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Erro ao atualizar avatar',
//     });
//   }
// };

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const { avatar } = req.body; // Espera receber a imagem em base64 no campo `avatar`

    if (!avatar) {
      return res.status(400).json({ message: 'Avatar não fornecido.' });
    }

    // Faz o upload da imagem em base64 diretamente para o Cloudinary
    const result = await cloudinary.uploader.upload(avatar, {
      upload_preset: 'social', // Substitua pelo seu upload_preset se configurado no Cloudinary
    });

    console.log('RESULTADO:', result.secure_url);

    const user = await User.findByIdAndUpdate(
      req?.user?._id,
      { avatar: result.secure_url },
      { new: true },
    ).select('-password');

    console.log('USUARIO COMPLETO LOGADO', req?.user?._id);
    res.json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
