// import { prisma } from "@/lib/prisma";
// import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { createUser } from "../../../prisma/services/UserService";

export async function POST(req: Request) {
  try {
    const params = (await req.json()) as {
      pseudo: string;
      password: string;
      passwordComfirm: string;
      email: string
    };

    // const hashed_password = await hash(password, 12);

    const user = await createUser(params)

    return NextResponse.json(user);

  } catch (error: any) {
    console.log(error.message)
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
  
}