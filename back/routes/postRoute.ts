import { isAuthenticatedToken, signToken } from '../middleware/auth';
import express from 'express';
import { createPost } from '../controllers/post.controller';

const postRoute = express.Router();

postRoute.post('/create', isAuthenticatedToken, createPost);

export default postRoute;
