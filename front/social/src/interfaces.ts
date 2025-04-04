export interface UserProfile {
  name: string;
  avatar: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  invites: UserProfile[];
  friends: UserProfile[];
}
export interface UserData {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  invites: UserProfile[];
  friends: UserProfile[];
}

export interface UserAuth {
  name: string;
  email: string;
  password: string;
}

export interface ProfileCardProps {
  user: UserData;
  isLoggedIn: boolean;
}

export interface PostData {
  _id: string;
  content: string;
  author: {
    _id: string;
    avatar: string;
    name: string;
  };
  createdAt: string;
  votes: string[];
}

export interface PostItem {
  content: string;
}

export interface ModalProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

export interface ModalConfirmProps {
  deleteUser: () => void;
  setOpenModalConfirm: (value: boolean) => void;
}

export interface FriendData {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthLogin {
  email: string;
  password: string;
}

export interface AuthRegister {
  name: string;
  email: string;
  password: string;
}

export interface SearchResponse {
  users: UserSearch[];
}

export interface SearchParams {
  name?: string;
  email?: string;
}

export interface IdUser {
  id: string;
}

export interface PostState {
  posts: PostData[];
}

export interface AuthorData {
  author: string;
}

export interface IdPost {
  id: string;
}

export interface IdInvite {
  id: string;
}

export interface InvitePending {
  avatar?: string;
  name?: string;
  email?: string;
  _id?: string;
}

export interface InvitesResponse {
  invites: InvitePending[];
}

export interface IConversation {
  _id: string;
  members: IUser[];
  messages: Message[];
  lastMessage: Message;
  unreadMessages: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  senderId: IUser;
  receiverId: IUser;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  _id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface UserSearch {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  friends: string[];
}

/**tipos do modulo Chat */

export interface UserSocket {
  userId: string;
  socketId: string;
}

export interface UserSocketState {
  onlineUsers: UserSocket[];
}

export interface ConversationState {
  senderId: string;
  receiverId: string;
}

export interface FormForgotPass {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}
export interface ChatState {
  chatActive: boolean;
  name: string;
  avatar: string;
  id: string;
  messages: [];
  unreadMessages: Record<string, number>;
  listUsersOnline: { userId: string; socketId: string }[];
}