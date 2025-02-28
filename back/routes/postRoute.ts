import { isAuthenticatedToken, signToken } from "../middleware/token";
import express from "express";
import {
  createPost,
  getUserPosts,
  deletePostById,
  updatePostById,
  votePost,
  reactToPost,
  userVotedPost,
} from "../controllers/post.controller";

const postRoute = express.Router();

postRoute.post("/create", isAuthenticatedToken, createPost);

postRoute.get("/:id", isAuthenticatedToken, getUserPosts);

postRoute.delete("/delete/:id", isAuthenticatedToken, deletePostById);

postRoute.put("/update/:id", isAuthenticatedToken, updatePostById);

postRoute.put("/reaction/:id", isAuthenticatedToken, reactToPost);

postRoute.put("/vote/:id", isAuthenticatedToken, votePost);

export default postRoute;
