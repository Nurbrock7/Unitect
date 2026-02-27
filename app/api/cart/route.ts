import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    data: {
      items: [],
      subtotal: 0,
      total: 0
    }
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ message: "Cart item accepted", data: body }, { status: 201 });
}
