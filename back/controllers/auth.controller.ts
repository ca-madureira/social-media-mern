import { NextFunction, Request, Response } from 'express';
import { signRefreshToken } from '../middleware/auth';

import {
  createUserService,
  loginUserService,
  sendForgotPasswordCodeService,
  verifyCodeService,
  updateUserPasswordService,
} from '../services/auth.service';
import User from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { user, token } = await createUserService(req.body);

    // Gere o Refresh Token
    const refreshToken = signRefreshToken(user);

    // Configure o cookie HttpOnly com o Refresh Token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    // Retorna a resposta com o Access Token e os campos corretos
    res.json({ user, token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const authResponse = await loginUserService(req.body);

    return res.status(200).json(authResponse);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};

export const sendForgotPasswordCode = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await sendForgotPasswordCodeService(email);

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Erro ao enviar código de recuperação:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Erro ao enviar o código de recuperação.',
    });
  }
};

export const verifyCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  try {
    await verifyCodeService({ email, code });

    return res.status(200).json({
      success: true,
      message: 'Código verificado com sucesso',
    });
  } catch (err: any) {
    console.error('Erro ao verificar o código:', err);
    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.',
    });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  const { email, pass } = req.body;

  try {
    const result = await updateUserPasswordService(email, pass);

    return res.status(200).json(result);
  } catch (err: any) {
    if (err.message === 'Usuário não encontrado') {
      return res.status(404).json({
        success: false,
        message: err.message,
      });
    }

    console.error('Erro ao atualizar a senha:', err);
    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.',
    });
  }
};
