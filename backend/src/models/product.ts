import { Schema, model } from "mongoose";

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
  },
  image: {
    type: { fileName: String, originalName: String },
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    default: null,
  },
});

export default model<IProduct>("Product", productSchema);
