import { IUser } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Adiciona a propriedade user à interface Request
    }
  }
}
