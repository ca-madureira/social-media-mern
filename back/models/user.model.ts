require('dotenv').config();
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  // comparePassword: (password: string) => Promise<boolean>;
  // SignAccessToken: () => string;
  // SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor entre com seu nome'],
    },
    email: {
      type: String,
      required: [true, 'Por favor entre com seu email'],
      validate: {
        validator: function (value: string) {
          return emailRegex.test(value);
        },
        message: 'Por favor entre com um email válido',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Por favor entre com sua senha'],
      minlength: [6, 'A senha deve conter no mínimo 6 caracteres'],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  },
);

// userSchema.methods.comparePassword = async function (
//   password: string,
// ): Promise<boolean> {
//   return await bcrypt.compare(password, this.password);
// };

// userSchema.methods.SignAccessToken = function (): string {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// userSchema.methods.SignRefreshToken = function (): string {
//   return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_SECRET!, {
//     expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
//   });
// };

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
