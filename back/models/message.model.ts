import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IMessage extends Document {
  chat: Object;
  sender: Object;
  receiver: Object;
  text: string;
  isRead: boolean;
  createdAt: Date;
}

const messageSchema: Schema<IMessage> = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message: Model<IMessage> = mongoose.model('Message', messageSchema);
export default Message;
