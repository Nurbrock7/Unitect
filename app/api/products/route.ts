import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  await connectToDatabase();
  const products = await Product.find({ isActive: true }).populate("category").lean();
  return NextResponse.json({ data: products });
}
