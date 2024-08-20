import { isAuthenticatedToken, signToken } from '../middleware/auth';
import express from 'express';
import { createPost, getUserPosts } from '../controllers/post.controller';

const postRoute = express.Router();

postRoute.post('/create', isAuthenticatedToken, createPost);

postRoute.get('/allPosts', isAuthenticatedToken, getUserPosts);

export default postRoute;
