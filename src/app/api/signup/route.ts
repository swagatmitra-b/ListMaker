import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  try {
    const userData = await prisma.user.create({
      data: {
        username,
        password: hashed,
      },
    });
    return Response.json(
      { user: userData, text: "User has been created" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      { err: error },
      {
        status: 500,
      }
    );
  }
}
