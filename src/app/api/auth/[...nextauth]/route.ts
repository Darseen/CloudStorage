import type { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import { Account } from "@prisma/client";

const authOptions: NextAuthOptions = {
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
        console.log(user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        const googleAuthData: User = {
          name: user.name!,
          email: user.email!,
          image: user.image!,
          authProvider: "google",
          googleId: user.id,
        };

        const exist = await prisma.user.findFirst({
          where: { email: user.email! },
        });
        if (exist) {
          await prisma.user.update({
            where: { email: user.email! },
            data: { image: user.image },
          });
        } else {
          await prisma.user.create({
            data: googleAuthData,
          });

          const res = await prisma.account.create({
            data: account as Account,
          });
          console.log(res);
        }
      }
      return true;
    },
  },

  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
