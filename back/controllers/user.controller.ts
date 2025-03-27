import { Request, Response } from "express";
import mongoose from "mongoose";
import cloudinary from "../utils/cloudinary";

import { deleteUserByIdService } from "../services/user.service";
import User from "../models/user.model";
import {
  searchUserService,
  sendInviteService,
  allInvitesService,
  acceptInviteService,
  allFriendsService,
  declineInviteService,
  unfriendService,
} from "../services/user.service";

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verifica se o usuário autenticado é o mesmo que está tentando deletar a conta
    //   const userId = req.user?._id.toString();
    // console.log('User ID from request:', req.user?._id.toHexString());
    console.log("ID from URL params:", id);

    // if (userId !== id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Você só pode deletar sua própria conta',
    //   });
    // }

    await deleteUserByIdService(id);

    return res
      .status(200)
      .json({ success: true, message: "Usuário deletado com sucesso" });
  } catch (error: any) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar usuário",
      error: error.message,
    });
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    const name = (req.query.name as string) || "";
    const email = (req.query.email as string) || "";

    const users = await searchUserService({ name, email });

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate(
      "friends invites",
      "name avatar email"
    );

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error: unknown) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const sendInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const friendId = req.params.id;

    console.log("usuario logado", userId, "usuario para convite", friendId);

    if (!userId) {
      return res.status(400).json({ message: "Usuário não autenticado" });
    }

    const friend = await sendInviteService(userId.toString(), friendId);

    return res
      .status(200)
      .json({ message: "Convite enviado com sucesso", friend });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message || "Erro ao enviar o convite" });
  }
};

export const allInvites = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Usuário não autenticado" });
    }

    const invites = await allInvitesService(id);

    return res.status(200).json({ invites });
  } catch (error: any) {
    console.error("Error retrieving invites:", error);
    return res
      .status(500)
      .json({ message: "Erro ao recuperar convites", error: error.message });
  }
};

export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const inviterId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "Usuário não autenticado" });
    }

    const user = await acceptInviteService(userId.toString(), inviterId);

    return res.status(200).json({ message: "Convite aceito com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao aceitar o convite" });
  }
};

export const declineInvite = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const inviterId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "Usuário não autenticado" });
    }

    const user = await declineInviteService(userId.toString(), inviterId);

    return res.status(200).json({ message: "Convite recusado com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao recusar o convite" });
  }
};

export const allFriends = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const friends = await allFriendsService(userId.toString());
    return res.status(200).json({ friends });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao recuperar amigos" });
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
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({ message: "Avatar não fornecido." });
    }

    const result = await cloudinary.uploader.upload(avatar, {
      upload_preset: "social",
    });

    const user = await User.findByIdAndUpdate(
      req?.user?._id,
      { avatar: result.secure_url },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

export const unfriend = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?._id as mongoose.Types.ObjectId;

  try {
    await unfriendService(id, userId.toString());
  } catch {}
};
