import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  await connectToDatabase();
  const product = await Product.findOne({ slug: params.slug, isActive: true }).populate("category").lean();

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ data: product });
}
