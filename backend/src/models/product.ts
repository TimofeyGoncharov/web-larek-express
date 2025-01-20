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
    required: [true, "Обязательное поле"],
    minlength: [2, "Минимальная длина - 2"],
    maxlength: [30, "Максимальная длина - 30"],
    unique: true,
  },
  image: {
    type: { fileName: String, originalName: String },
    required: [true, "Обязательное поле"],
  },
  category: {
    type: String,
    required: [true, "Обязательное поле"],
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
