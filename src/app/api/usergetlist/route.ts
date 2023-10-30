import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { username } = await req.json();

  const post = await prisma.lists.findMany({
    where: {
      creator: {
        username,
      },
    },
  });
  return NextResponse.json({ post });
}
