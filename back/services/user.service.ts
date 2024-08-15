import { signToken } from '../middleware/auth';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

const create = async (data: any) => {
  const { name, email, password } = data;

  if (
    !name ||
    !email ||
    !password ||
    name === '' ||
    email === '' ||
    password === ''
  ) {
    throw new Error('All fields are required');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  const token = signToken(newUser);

  return { user: newUser, token };
};

export default create;
