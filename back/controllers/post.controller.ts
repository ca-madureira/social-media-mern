import { Request, Response } from "express";
import { create, deletePostByIdService } from "../services/post.service";
import {
  getUserPostsService,
  updatePostByIdService,
} from "../services/post.service";
import mongoose from "mongoose";
import Post from "../models/post.model";

interface User {
  _id: mongoose.Types.ObjectId;
  friends: mongoose.Types.ObjectId[];
}

export const createPost = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const author = req.user?._id;
    if (!author) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    const newPost = await create({ ...req.body, author });

    return res
      .status(201)
      .json({ message: "Post criado com sucesso", post: newPost });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao criar o post" });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de usuário inválido" });
    }

    const user = req.user as User;

    let posts;

    if (id === user._id.toString()) {
      posts = await Post.find({
        author: { $in: [...user.friends, user._id] },
      }).populate("author", "name avatar email").sort("-createdAt");
    } else {
      posts = await Post.find({
        author: id,
      })
        .populate("author", "name avatar email")
        .sort("-createdAt");
    }

    return res
      .status(200)
      .json({ message: "Posts retornados com sucesso", posts });
  } catch (error) {
    console.error("Erro ao retornar os posts:", error);
    return res.status(500).json({ message: "Erro ao retornar os posts" });
  }
};

export const deletePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const objectId = new mongoose.Types.ObjectId(id);

    await deletePostByIdService(objectId);

    res.status(200).json({ success: true, message: `Post deletado` });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Erro ao deletar post",
      error: error.message,
    });
  }
};

export const updatePostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "ID inválido" });
    }

    await updatePostByIdService({ id, ...req.body });

    res.status(200).json({ success: true, message: "Post atualizado" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar o post",
      error: error.message,
    });
  }
};

export const votePost = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id as mongoose.Types.ObjectId;
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "ID de post inválido" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    const alreadyVoted = post.votes.some((voterId) => voterId.equals(userId));

    if (alreadyVoted) {
      post.votes = post.votes.filter((voterId) => !voterId.equals(userId));
    } else {
      post.votes.push(userId);
    }

    await post.save();

    return res.status(200).json({
      message: alreadyVoted
        ? "Voto removido com sucesso"
        : "Voto adicionado com sucesso",
      votes: post.votes.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao processar o voto", error });
  }
};

export const userVotedPost = async (req: Request, res: Response) => {
  try {
    const author = req.user?._id;
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    const voted = post.votes.some((vote) =>
      vote.equals(author as mongoose.Types.ObjectId)
    );

    res.status(200).json({ voted });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Erro ao deletar post",
      error: error.message,
    });
  }
};
