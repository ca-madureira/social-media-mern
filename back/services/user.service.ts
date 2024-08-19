import { signToken } from '../middleware/auth';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  // avatar: string;
}

const create = async (data: CreateUserData) => {
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

  // let myCloud;
  // try {
  //   myCloud = await cloudinary.v2.uploader.upload(avatar, {
  //     folder: 'avatar',
  //   });
  // } catch (error) {
  //   throw new Error('Failed to upload image');
  // }

  // const picture = {
  //   image: {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   },
  // };

  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  const token = signToken(newUser);

  return { user: newUser, token };
};

export default create;
