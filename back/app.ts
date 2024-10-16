require('dotenv').config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import postRoute from './routes/postRoute';
import authRoute from './routes/auth.route';
import authRouter from './routes/auth.route';
import friendRouter from './routes/friend.route';
export const app = express();

// app.use(express.json({ limit: '50mb' }));

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
);

app.use('/user', userRouter);
app.use('/posts', postRoute);
app.use('/auth', authRouter);
app.use('/friend', friendRouter);
