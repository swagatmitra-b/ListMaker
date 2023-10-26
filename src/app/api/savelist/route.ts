import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const lastList = await prisma.lists.findFirst({
    orderBy: {
      id: "desc",
    },
  });
  return NextResponse.json({ lastList });
}

export async function POST(req: NextRequest) {
  const { id, title, listMembers } = await req.json();
  const targetList = await prisma.lists.update({
    where: {
      id,
    },
    data: {
      title,
      content: listMembers.join(";"),
    },
  });
  if (!targetList) {
    const newList = await prisma.lists.create({
      data: {
        title,
        content: listMembers.join(";"),
      },
    });
    return NextResponse.json({ newList });
  }
  return NextResponse.json({ targetList });
}
