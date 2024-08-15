import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IChat extends Document {
  participants: string[];
  messages: string[];
}

const chatSchema: Schema<IChat> = new mongoose.Schema({
  participants: [
    {
      type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
      required: true,
    },
  ],
  messages: [
    {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    },
  ],
});

const chat: Model<IChat> = mongoose.model('Chat', chatSchema);
export default chat;
