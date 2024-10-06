import { isAuthenticatedToken, signToken } from '../middleware/token';
import express from 'express';
import {
  sendInvite,
  allInvites,
  acceptInvite,
  allFriends,
  getFriendPosts,
} from '../controllers/friend.controller';

const friendRouter = express.Router();

friendRouter.put('/invite/:id', isAuthenticatedToken, sendInvite);

friendRouter.get('/invites', isAuthenticatedToken, allInvites);

friendRouter.put('/accept/:id', isAuthenticatedToken, acceptInvite);

friendRouter.get('/friends', isAuthenticatedToken, allFriends);

friendRouter.get('/friends/posts', isAuthenticatedToken, getFriendPosts);

export default friendRouter;
