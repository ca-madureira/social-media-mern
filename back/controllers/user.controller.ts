import { NextFunction, Request, Response } from 'express';
import create from '../services/user.service';

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
