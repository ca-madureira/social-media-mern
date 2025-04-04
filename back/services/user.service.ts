import mongoose from "mongoose";

import User from "../models/user.model";
import Post from "../models/post.model";
import cloudinary from "../utils/cloudinary";

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


  const nameRegex = name ? `^${name}` : "";
  const emailRegex = email ? `^${email}` : "";


  const users = await User.find({
    $or: [
      { name: { $regex: nameRegex, $options: "i" } },
      { email: { $regex: emailRegex, $options: "i" } },
    ],
  })
    .select("name avatar email friends")
    .populate({
      path: "friends",
      select: "name avatar email",
    });

  console.log(users);
  return users;
};

export const sendInviteService = async (userId: string, friendId: string) => {
  if (!mongoose.Types.ObjectId.isValid(friendId)) {
    throw new Error("ID de usuário inválido");
  }

  const friend = await User.findByIdAndUpdate(
    friendId,
    { $addToSet: { invites: userId } },
    { new: true }
  );

  if (!friend) {
    throw new Error("Usuário não encontrado");
  }

  return friend;
};

export const allInvitesService = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: "invites",
    select: "avatar name email",
  });

  return user?.invites;
};

export const acceptInviteService = async (
  userId: string,
  inviterId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(inviterId)) {
    throw new Error("ID de usuário inválido");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  user.invites = user.invites.filter(
    (inviteId) => inviteId.toString() !== inviterId
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
  inviterId: string
) => {
  if (!mongoose.Types.ObjectId.isValid(inviterId)) {
    throw new Error("ID de usuário inválido");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  user.invites = user.invites.filter(
    (inviteId) => inviteId.toString() !== inviterId
  );

  await user.save();

  return user;
};

export const allFriendsService = async (userId: string) => {
  const user = await User.findById(userId).populate({
    path: "friends",
    select: "name avatar email",
  });

  return user?.friends;
};

export const getFriendPostsService = async (
  userId: mongoose.Types.ObjectId | string
) => {
  const user = await User.findById(userId).populate("friends", "name email");

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const friendIds = user.friends.map((friend) => friend._id);


  const friendPosts = await Post.find({ author: { $in: friendIds } })
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  return friendPosts;
};

export const unfriendService = async (friendId: string, userId: string) => {
  try {
    const userLogged = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!userLogged || !friend) {
      throw new Error("Usuário ou amigo não encontrado");
    }

    friend.friends = friend.friends.filter(
      (friend) => friend.toString() !== userId
    );
    userLogged.friends = userLogged.friends.filter(
      (friend) => friend.toString() !== friendId
    );

    await userLogged.save();
    await friend.save();
  } catch (err) {
    throw err;
  }
};

export const uploadAvatarService = async (userId: string, avatar: string) => {
  try {

    const result = await cloudinary.uploader.upload(avatar, {
      upload_preset: "social",
    });


    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: result.secure_url },
      { new: true }
    ).select("-password");

    return user;
  } catch (err: any) {
    console.error(err);
    throw new Error('Erro ao fazer upload do avatar');
  }
};