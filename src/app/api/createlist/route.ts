import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { title, listMembers } = await req.json();
  const newList = await prisma.lists.create({
    data: {
      title,
      content: listMembers.join(";"),
    },
  });
  return NextResponse.json({ newList });
}
