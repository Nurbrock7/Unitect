import { Schema, model, models } from "mongoose";

export interface IQuoteRequest {
  _id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
  fileUrl: string;
  status: "new" | "contacted" | "quoted" | "closed";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const quoteRequestSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true },
    quantity: { type: String, default: "" },
    message: { type: String, default: "" },
    fileUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "closed"],
      default: "new",
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

quoteRequestSchema.index({ status: 1, createdAt: -1 });

const QuoteRequest =
  models.QuoteRequest || model("QuoteRequest", quoteRequestSchema);

export default QuoteRequest;
