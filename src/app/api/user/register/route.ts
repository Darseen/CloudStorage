import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

type UserData = {
  username: string;
  email: string;
  password: string;
};

export async function POST(req: Request) {
  const userData: UserData = await req.json();
  const { username, email, password } = userData;

  if (!username || !email || !password) {
    return NextResponse.json(
      { message: "Missing Credentials" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name: username,
        email,
        authProvider: "credentials",
        password: hashedPassword,
      },
    });
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }

  return NextResponse.json({ message: "User Registered Successfully" });
}
