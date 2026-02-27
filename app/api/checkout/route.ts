import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(request: Request) {
  const payload = await request.json();
  await connectToDatabase();
  const order = await Order.create(payload);
  return NextResponse.json({ message: "Order created", data: order }, { status: 201 });
}
