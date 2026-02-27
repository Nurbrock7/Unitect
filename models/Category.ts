import { Schema, model, models } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

const Category = models.Category || model("Category", categorySchema);

export default Category;
