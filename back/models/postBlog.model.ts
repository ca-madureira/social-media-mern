import mongoose, { Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  text: string;
  image: string;
  likes: number;
  author: Object;
  tags: string[];
  categories: string[];
  slug: string;
  comments: string[];
  replies: string[];
}

const postSchema: Schema<IPost> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  tags: [
    {
      type: String,
    },
  ],
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  slug: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});
