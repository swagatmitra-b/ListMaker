import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const deleteList = await prisma.lists.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ deleteList });
}
