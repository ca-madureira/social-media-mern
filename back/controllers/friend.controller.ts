import { Request, Response } from 'express';
import {
  sendInviteService,
  allInvitesService,
  acceptInviteService,
  allFriendsService,
  getFriendPostsService,
} from '../services/friend.service';
import mongoose from 'mongoose';

export const sendInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const friendId = req.params.id;

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
    const userId = req.user?._id as mongoose.Types.ObjectId;

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    // Converte userId para string antes de passar para o serviço
    const invites = await allInvitesService(userId.toString());

    return res.status(200).json({ invites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao recuperar convites' });
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

export const allFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;

    if (!userId) {
      return res.status(400).json({ message: 'Usuário não autenticado' });
    }

    // Converte userId para string antes de passar para o serviço
    const friends = await allFriendsService(userId.toString());

    return res.status(200).json({ friends });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao recuperar amigos' });
  }
};

export const getFriendPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // ID do usuário logado

    const friendPosts = await getFriendPostsService(userId);

    return res.status(200).json(friendPosts);
  } catch (error: any) {
    return res.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'Erro ao buscar os posts dos amigos',
    });
  }
};
