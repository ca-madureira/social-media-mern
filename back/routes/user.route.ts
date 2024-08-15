import { isAuthenticatedToken, signToken } from '../middleware/auth';
import express from 'express';
import { createUser } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.post('/create', createUser);

export default userRouter;
