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

export interface ProfileCardProps {
  user: User;
  isLoggedIn: boolean;
}

export interface PostData {
  _id: string;
  content: string;
  author: {
    avatar: string;
    name: string;
  };
  createdAt: string;
  votes: string[];
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
  users: User[];
}

export interface SearchParams {
  name?: string;
  email?: string;
}

export interface IdUser {
  id: string;
}

export interface PostData {
  content: string;
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
  name?: string;
  email?: string;
  _id?: string;
}

export interface InvitesResponse {
  invites: InvitePending[];
}
