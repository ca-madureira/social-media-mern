import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IPost extends Document {
  content: string;
  reactions: {
    happy: mongoose.Types.ObjectId[]; // Array de ObjectId para "happy"
    sad: mongoose.Types.ObjectId[]; // Array de ObjectId para "sad"
  };
  votes: mongoose.Types.ObjectId[];
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
    reactions: {
      sad: {
        type: [mongoose.Types.ObjectId], // Array de ObjectId para "sad"
        ref: 'User',
        default: [], // Inicializa como array vazio
      },
      happy: {
        type: [mongoose.Types.ObjectId], // Array de ObjectId para "happy"
        ref: 'User',
        default: [], // Inicializa como array vazio
      },
    },
    votes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
    author: {
      type: mongoose.Types.ObjectId,
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
