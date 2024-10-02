import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const signRefreshToken = (user: IUser): string => {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET as string, // Use uma chave secreta diferente para refresh tokens
    { expiresIn: '7d' }, // Tempo de expiração maior, por exemplo, 7 dias
  );

  return refreshToken;
};

export const isAuthenticatedToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    // Obtém o token do cabeçalho 'Authorization'
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ msg: 'Autenticação inválida' });
    }

    // Verifica o token e decodifica o ID do usuário
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as DecodedToken;

    if (!decoded) {
      return res.status(401).json({ msg: 'Autenticação inválida' });
    }

    // Procura o usuário no banco de dados pelo ID decodificado
    const user: IUser | null = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Associa o usuário encontrado ao req.user
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: (err as Error).message });
  }
};

export const signToken = (user: IUser, res: Response) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '1h' }, // Tempo de expiração menor para o Access Token
  );

  // Gere o Refresh Token
  const refreshToken = signRefreshToken(user);

  // Configure o cookie HttpOnly com o Refresh Token
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // Tempo de expiração do cookie (7 dias)
  });

  return token; // Retorna apenas o Access Token
};
