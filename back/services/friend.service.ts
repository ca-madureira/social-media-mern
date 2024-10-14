import mongoose from 'mongoose';
import User from '../models/user.model';
import Post from '../models/post.model';

export const sendInviteService = async (userId: string, friendId: string) => {
  if (!mongoose.Types.ObjectId.isValid(friendId)) {
    throw new Error('ID de usuário inválido');
  }

  const friend = await User.findByIdAndUpdate(
    friendId,
    { $addToSet: { invites: userId } }, // $addToSet evita duplicados
    { new: true },
  );

  if (!friend) {
    throw new Error('Usuário não encontrado');
  }

  return friend;
};

export const allInvitesService = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: 'invites',
    select: 'name email',
  });

  return user?.invites;
};

export const acceptInviteService = async (
  userId: string,
  inviterId: string,
) => {
  if (!mongoose.Types.ObjectId.isValid(inviterId)) {
    throw new Error('ID de usuário inválido');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  user.invites = user.invites.filter(
    (inviteId) => inviteId.toString() !== inviterId,
  );
  user.friends.push(new mongoose.Types.ObjectId(inviterId));

  await user.save();

  await User.findByIdAndUpdate(inviterId, {
    $addToSet: { friends: userId },
  });

  return user;
};

export const declineInviteService = async (
  userId: string,
  inviterId: string,
) => {
  if (!mongoose.Types.ObjectId.isValid(inviterId)) {
    throw new Error('ID de usuário inválido');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  user.invites = user.invites.filter(
    (inviteId) => inviteId.toString() !== inviterId,
  );

  await user.save();

  return user;
};

export const allFriendsService = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: 'friends',
    select: 'name email',
  });

  return user?.friends;
};

export const getFriendPostsService = async (
  userId: mongoose.Types.ObjectId | string,
) => {
  const user = await User.findById(userId).populate('friends', 'name email');

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  const friendIds = user.friends.map((friend) => friend._id); // Extrai os IDs dos amigos

  // Buscar os posts dos amigos
  const friendPosts = await Post.find({ author: { $in: friendIds } })
    .populate('author', 'name email') // Para pegar o nome e avatar dos autores (amigos)
    .sort({ createdAt: -1 }); // Ordenar pelos mais recentes

  return friendPosts;
};
