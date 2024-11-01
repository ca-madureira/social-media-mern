import { isAuthenticatedToken, signToken } from '../middleware/token';
import express from 'express';
import {
  deleteUserById,
  getUser,
  searchUser,
  sendInvite,
  allInvites,
  acceptInvite,
  declineInvite,
  allFriends,
  uploadAvatar,
} from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.delete('/delete/:id', isAuthenticatedToken, deleteUserById);
userRouter.get('/search', searchUser);
userRouter.get('/:id/friends', allFriends);
userRouter.get('/:id', getUser);
userRouter.put('/invite/:id', isAuthenticatedToken, sendInvite);
userRouter.get('/invites/:id', isAuthenticatedToken, allInvites);
userRouter.put('/accept/:id', isAuthenticatedToken, acceptInvite);
userRouter.put('/decline/:id', isAuthenticatedToken, declineInvite);

userRouter.put('/update-user-avatar', isAuthenticatedToken, uploadAvatar);

export default userRouter;
