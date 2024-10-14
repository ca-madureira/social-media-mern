import { isAuthenticatedToken, signToken } from '../middleware/token';
import express from 'express';
import {
  sendInvite,
  allInvites,
  acceptInvite,
  allFriends,
  declineInvite,
} from '../controllers/friend.controller';

const friendRouter = express.Router();

friendRouter.put('/invite/:id', isAuthenticatedToken, sendInvite);

friendRouter.get('/invites', isAuthenticatedToken, allInvites);

friendRouter.put('/accept/:id', isAuthenticatedToken, acceptInvite);

friendRouter.put('/decline/:id', isAuthenticatedToken, declineInvite);

// friendRouter.get('/friends', isAuthenticatedToken, allFriends);

// friendRouter.get('/:id/friends', allFriends);

export default friendRouter;
