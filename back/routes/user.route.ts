import { isAuthenticatedToken, signToken } from '../middleware/token';
import express from 'express';
import { deleteUserById, searchUser } from '../controllers/user.controller';
import { allFriends } from '../controllers/friend.controller';

const userRouter = express.Router();

userRouter.delete('/delete/:id', isAuthenticatedToken, deleteUserById);
userRouter.get('/search', searchUser);
userRouter.get('/:id/friends', allFriends);

export default userRouter;
