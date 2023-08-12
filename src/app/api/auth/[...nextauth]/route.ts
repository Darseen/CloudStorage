import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // username: { label: "email", type: "email" },
        // password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const data = await res.json();
        const user = data?.user;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  events: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const exist = await prisma.credentialsUser.findFirst({
          where: { email: user.email! },
        });
        if (exist) {
          await prisma.credentialsUser.update({
            where: { email: user.email! },
            data: { image: user.image },
          });
        }
      }
    },
  },

  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
