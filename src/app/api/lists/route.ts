import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const lists = await prisma.lists.findMany();
  return NextResponse.json({ lists });
}

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  const list = await prisma.lists.findUnique({
    where: {
      id,
    },
  });
  return NextResponse.json({ list });
}
