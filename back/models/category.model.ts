import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICategory extends Document {
  title: string;
}

const categorySchema: Schema<ICategory> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const category: Model<ICategory> = mongoose.model('Category', categorySchema);

export default category;
