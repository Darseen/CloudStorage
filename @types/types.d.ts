import { DefaultSession } from "next-auth";

declare global {
  type User = {
    name: string;
    email: string;
    password?: string;
    image: string;
    googleId?: string;
    authProvider: string;
  };
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
