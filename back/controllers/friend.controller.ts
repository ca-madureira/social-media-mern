import { Request, Response } from 'express';
import User from '../models/user.model';
import {
  sendInviteService,
  allInvitesService,
  acceptInviteService,
  allFriendsService,
  getFriendPostsService,
  declineInviteService,
} from '../services/friend.service';
import mongoose from 'mongoose';

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
