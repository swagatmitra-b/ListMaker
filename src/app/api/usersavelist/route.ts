import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { id, title, listMembers, username } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (user) {
    const list = await prisma.lists.update({
      where: {
        id,
        creatorId: user.id,
      },
      data: {
        title,
        content: listMembers.join(";"),
      },
    });
    return NextResponse.json({ list });
  } else {
    return NextResponse.json("User does not exist");
  }
}
