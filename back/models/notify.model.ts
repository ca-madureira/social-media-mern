import mongoose, { Schema, Model, Document } from 'mongoose';

export interface INotify extends Document {
  user: Object;
  fromUser: Object;
  type: string;
  text: string;
  url: string;
  isRead: boolean;
}

const notifySchema: Schema<INotify> = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fromUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['like', 'comment', 'follow'],
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const notifyModel: Model<INotify> = mongoose.model('Notify', notifySchema);

export default notifyModel;
