import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";

type UserData = {
  email: string;
  password?: string;
};

export async function POST(req: Request) {
  const userData: UserData = await req.json();
  const { email, password } = userData;

  if (!email || !password) {
    return NextResponse.json({ err: "Missing Credentials" }, { status: 403 });
  }

  try {
    const user = await prisma.credentialsUser.findFirst({
      where: { email },
    });
    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const passCheck = await bcrypt.compare(password, user.password!);

    if (passCheck) {
      user.password = "";
      return NextResponse.json(
        {
          success: "User Signed in Successfully",
          user,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ err: "Something went wrong!" }, { status: 500 });
  }
  return NextResponse.json({ err: "Invalid Credentials" }, { status: 401 });
}
