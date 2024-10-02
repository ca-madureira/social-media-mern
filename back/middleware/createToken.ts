import jwt from 'jsonwebtoken';
import { IUser } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

const generateToken = (res: Response, user: IUser) => {
  const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '3d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
