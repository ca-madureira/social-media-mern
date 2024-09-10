import { isAuthenticatedToken, signToken } from '../middleware/auth';
import express from 'express';
import {
  acceptInvite,
  createUser,
  deleteUserById,
  loginController,
  searchUser,
  sendInvite,
  allInvites,
  allFriends,
  getFriendPosts,
} from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/create', createUser);

userRouter.post('/login', loginController);

userRouter.delete('/delete/:id', isAuthenticatedToken, deleteUserById);

userRouter.get('/search', searchUser);

userRouter.put('/invite/:id', isAuthenticatedToken, sendInvite);

userRouter.get('/invites', isAuthenticatedToken, allInvites);

userRouter.put('/accept/:id', isAuthenticatedToken, acceptInvite);

userRouter.get('/friends', isAuthenticatedToken, allFriends);

userRouter.get('/friends/posts', isAuthenticatedToken, getFriendPosts);

export default userRouter;
