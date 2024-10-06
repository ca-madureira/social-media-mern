import { isAuthenticatedToken, signToken } from '../middleware/token';
import express from 'express';
import {
  createUser,
  loginUser,
  sendForgotPasswordCode,
  updatePassword,
  verifyCode,
} from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/create', createUser);

authRouter.post('/login', loginUser);

authRouter.post('/forgotPass', sendForgotPasswordCode);

authRouter.post('/verifyCode', verifyCode);

authRouter.put('/updatePass', updatePassword);

export default authRouter;
