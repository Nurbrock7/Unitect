import { Schema, model, models } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", categorySchema);

export default Category;
