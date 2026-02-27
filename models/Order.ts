import { Schema, model, models } from "mongoose";

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    customerType: { type: String, enum: ["B2B", "B2C"], required: true },
    companyName: { type: String, default: "" },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, required: true, min: 0, default: 0 },
    shipping: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "paid", "processing", "shipped", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
