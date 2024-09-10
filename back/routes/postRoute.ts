import { isAuthenticatedToken, signToken } from '../middleware/auth';
import express from 'express';
import {
  createPost,
  getUserPosts,
  deletePostById,
  updatePostById,
} from '../controllers/post.controller';

const postRoute = express.Router();

postRoute.post('/create', isAuthenticatedToken, createPost);

postRoute.get('/allPosts', isAuthenticatedToken, getUserPosts);

postRoute.delete('/delete/:id', isAuthenticatedToken, deletePostById);

postRoute.put('/update/:id', isAuthenticatedToken, updatePostById);

export default postRoute;
