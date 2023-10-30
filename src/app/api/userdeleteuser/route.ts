import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(req: NextRequest) {
  const { username } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    const lists = await prisma.lists.findMany({
      where: {
        creatorId: user.id,
      },
    });
    if (lists.length != 0) {
        const deletelists = await prisma.lists.deleteMany({
            where: {
                creatorId: user.id
            }
        })
        const deleteUser = await prisma.user.delete({
            where: {
                username
            }
        })
        return NextResponse.json(`User ${username} with ${lists.length} lists has been deleted`)
    }
    const deleteUser = await prisma.user.delete({
        where: {
            username
        }
    })
    return NextResponse.json(`User ${username} with ${lists.length} lists has been deleted`)
  } else {
    return NextResponse.json("no user exists")
  }
}
