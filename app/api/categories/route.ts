import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  await connectToDatabase();
  const categories = await Category.find().lean();
  return NextResponse.json({ data: categories });
}
