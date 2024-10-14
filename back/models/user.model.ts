require('dotenv').config();
import mongoose, { Document, Model, Schema } from 'mongoose';

const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  // avatar: {
  //   public_id: string;
  //   url: string;
  // };
  avatar: string;
  invites: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
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
      type: String,
    },
    invites: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
