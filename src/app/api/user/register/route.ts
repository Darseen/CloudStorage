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
    return NextResponse.json({ err: "Missing Credentials" }, { status: 403 });
  }

  try {
    const userExist = await prisma.credentialsUser.findFirst({
      where: { email },
    });
    if (userExist) {
      return NextResponse.json(
        { err: "Email is already in use" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.credentialsUser.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });
  } catch (err) {
    return NextResponse.json({ err: "Something went wrong!" }, { status: 500 });
  }

  return NextResponse.json({ success: "User Registered Successfully" });
}
