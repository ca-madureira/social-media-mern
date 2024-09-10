import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IPost extends Document {
  content: string;
  likes: mongoose.Types.ObjectId[];
  author: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    author: {
      type: String,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Habilita os campos createdAt e updatedAt
  },
);

const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);
export default Post;
