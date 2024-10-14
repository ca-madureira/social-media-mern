import { isAuthenticatedToken, signToken } from '../middleware/token';
import express from 'express';
import {
  createPost,
  getUserPosts,
  deletePostById,
  updatePostById,
  votePost,
  reactToPost,
  userVotedPost,
} from '../controllers/post.controller';

const postRoute = express.Router();

postRoute.post('/create', isAuthenticatedToken, createPost);

postRoute.get('/allPosts', isAuthenticatedToken, getUserPosts);

postRoute.delete('/delete/:id', isAuthenticatedToken, deletePostById);

postRoute.put('/update/:id', isAuthenticatedToken, updatePostById);

postRoute.put('/reaction/:id', isAuthenticatedToken, reactToPost);

postRoute.put('/vote/:id', isAuthenticatedToken, votePost);

postRoute.get('/vote/userVoted', isAuthenticatedToken, userVotedPost);

export default postRoute;
