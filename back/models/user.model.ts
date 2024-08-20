require('dotenv').config();
import mongoose, { Document, Model, Schema } from 'mongoose';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
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

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
