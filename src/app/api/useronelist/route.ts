import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { username, id } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    const list = await prisma.lists.findUnique({
      where: {
        id,
        creatorId: user.id,
      },
    });
    return NextResponse.json({ list });
  } else {
    return NextResponse.json("user not found");
  }
}
