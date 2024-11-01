import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // Alterado
  api_key: process.env.CLOUD_API_KEY, // Alterado
  api_secret: process.env.CLOUD_SECRET_KEY, // Alterado
});

export default cloudinary;
