import { connectDb } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import type { DemoForm } from "./interface";
import DemoFormModel from "@/model/User";

export async function POST(request: Request) {
  await connectDb();
  try {
    const body: DemoForm = (await request.json()) as DemoForm;
    const { name, phoneNumber, email, grade } = body;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format for lead.", success: false },
        { status: 400 },
      );
    }
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        {
          message: "Invalid phone number format for lead. Must be 10 digits.",
          success: false,
        },
        { status: 400 },
      );
    }

    // Explicitly type the input for `create`
    await DemoFormModel.create({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      grade: grade,
    } as DemoForm);

    console.log({ name, phoneNumber, email, grade });

    return NextResponse.json(
      { message: "Registration saved successfully", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error registering:", error);
    return NextResponse.json(
      { message: "Failed to save registration", success: false },
      { status: 500 },
    );
  }
}
