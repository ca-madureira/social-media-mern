import { isAuthenticatedToken, signToken } from '../middleware/token';
import express from 'express';
import { deleteUserById, searchUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.delete('/delete/:id', isAuthenticatedToken, deleteUserById);
userRouter.get('/search', searchUser);

export default userRouter;
