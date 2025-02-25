import mongoose, { Schema, Model, Document } from "mongoose";
import User from "./user.model";
import Message from "./message.model";

export interface IConversation extends Document {
  members: Object[];
  messages: Object[];
}

const conversationSchema: Schema<IConversation> = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const conversationModel: Model<IConversation> = mongoose.model(
  "Conversation",
  conversationSchema
);
export default conversationModel;
