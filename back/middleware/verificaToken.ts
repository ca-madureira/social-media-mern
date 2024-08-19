// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import User from '../models/user.model';

// const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Autenticação necessária' });
//   }

//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);

//     if (!user) {
//       throw new Error();
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Autenticação inválida' });
//   }
// };

// export default authMiddleware;
