import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { username, title, listMembers } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    const newlist = await prisma.lists.create({
      data: {
        title,
        content: listMembers.join(";"),
        creatorId: user.id, 
      },
    });
    return NextResponse.json({ newlist });
  } else {
    return NextResponse.json("User does not exist!");
    console.log("user non-existent");
  }
}
