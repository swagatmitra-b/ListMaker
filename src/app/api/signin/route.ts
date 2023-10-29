import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (user) {
    console.log(user);
    const isTrue = await bcrypt.compare(password, user.password);
    if (isTrue) {
      return NextResponse.json({ user });
    }
    return NextResponse.json("invalid password");
  } else {
    return NextResponse.json("no user found");
  }
  // const username = 'swagat';
  // const postId = 3
  // const post = await prisma.lists.findUnique({
  //   where: {
  //       creator: {
  //           username
  //       },
  //       id: postId
  //   },
  //   include: {
  //       creator: true
  //   }
  // });

  // return NextResponse.json({ post });
}
