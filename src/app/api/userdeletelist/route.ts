import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(req: NextRequest) {
  const { id, username } = await req.json();
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (user) {
    const deletelist = await prisma.lists.delete({
      where: {
        id,
        creatorId: user.id,
      },
    });
    return NextResponse.json({ deletelist });
  } else {
    return NextResponse.json("User does not exist");
  }
}
