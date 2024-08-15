require('dotenv').config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route';

export const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
);

app.use('/user', userRoute);
