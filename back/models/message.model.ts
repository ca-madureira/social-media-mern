import mongoose, { Schema, Model, Document } from "mongoose";
import User from "./user.model";

export interface IMessage extends Document {
  senderId: Object;
  receiverId: Object;
  message: string;
}

const messageSchema: Schema<IMessage> = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const messageModel: Model<IMessage> = mongoose.model("Message", messageSchema);

export default messageModel;
