import { isAuthenticatedToken, signToken } from '../middleware/auth';
import express from 'express';
import { createUser, loginController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/create', createUser);

userRouter.post('/login', loginController);

export default userRouter;
