import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IComment extends Document {
  text: string;
  author: Object;
}

const commentSchema: Schema<IComment> = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Comment: Model<IComment> = mongoose.model('Comment', commentSchema);

export default Comment;
