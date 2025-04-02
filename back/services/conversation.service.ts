import Conversation from "../models/conversation.model";
import User from "../models/user.model";


interface MembersParams {
  senderId: string;
  receiverId: string;
}


export const getConversationBetweenUsersService = async (
  data: MembersParams
) => {
  const { senderId, receiverId } = data;

  if (!senderId || !receiverId) {
    throw new Error("Sender ID ou Receiver ID inválido.");
  }


  const conversation = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  }).populate("messages lastMessage");

  if (!conversation) {
    return null;
  }


  const otherUserId = conversation.members[0].toString() === senderId ? conversation.members[1] : conversation.members[0];


  const otherUser = await User.findById(otherUserId);

  if (!otherUser) {
    throw new Error("Usuário não encontrado.");
  }


  const conversationData = {
    ...conversation.toObject(),
    otherUser: {
      id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar,
    },
    lastMessage: conversation.lastMessage || null,
  };

  return conversationData;
};

export const getAllUserConversationsService = async (userId: string) => {
  const conversations = await Conversation.find({
    members: userId
  }).populate({
    path: "lastMessage",
    populate: [
      {
        path: "receiverId",
        select: "name avatar",
        match: { _id: { $ne: userId } },
      },
      {
        path: "senderId",
        select: "name avatar",
        match: { _id: { $ne: userId } },
      }
    ],
  }).sort("-createdAt");;

  return conversations;
};
