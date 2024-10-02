import mongoose, { Schema, model, Document } from 'mongoose';

interface IPassReset extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  expiresAt: Date;
}

const passwordResetTokenSchema = new Schema<IPassReset>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expiresAt: {
    type: Date,
    required: true,
    // Define o TTL para que o documento seja deletado após a data de expiração
    index: true, // Aplica o índice TTL no campo expiresAt
  },
});

const PasswordResetToken = model<IPassReset>(
  'PasswordResetToken',
  passwordResetTokenSchema,
);

export default PasswordResetToken;
