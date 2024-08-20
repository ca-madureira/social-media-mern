import { NextFunction, Request, Response } from 'express';

import { loginService, create } from '../services/user.service';

export const createUser = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const user = await create(req.body);
    return res
      .status(201)
      .json({ message: 'Usuário registrado com sucesso', user });
  } catch (error: any) {
    if (error.message === 'preencha os campos') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'User already exists') {
      return res.status(409).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'E-mail e senha são obrigatórios' });
    }

    const authResponse = await loginService({ email, password });

    return res.status(200).json(authResponse);
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};
