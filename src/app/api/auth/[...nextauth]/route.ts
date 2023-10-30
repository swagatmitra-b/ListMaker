import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as Record<
          "username" | "password",
          string
        >;
        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (user) {
          const isTrue = await bcrypt.compare(password, user.password);
          if (isTrue) {
            return {
              id: "",
              name: username,
            };
          }
          return null
        }
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
