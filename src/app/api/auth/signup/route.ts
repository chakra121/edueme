import { connectDb } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import StudentModel from "@/model/User";

export async function POST(request: Request) {
  await connectDb();
  try {
    const body = await request.json();
    const { 
      firstName,
      lastName,
      gender,
      grade,
      schoolName,
      phoneNumber,
      email,
      parentEmail,
      password,
      userRole
    } = body;

    // Create new student document
    const newStudent = await StudentModel.create({
      firstName,
      lastName,
      gender,
      grade,
      schoolName,
      phoneNumber,
      email,
      parentEmail,
      password, // The password will be automatically hashed by the model
      userRole
    });

    console.log("Registration successful:", newStudent);

    return NextResponse.json(
      { message: "Registration saved successfully", success: true },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error registering:", error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already exists", success: false },
        { status: 409 },
      );
    }
    
    return NextResponse.json(
      { message: "Failed to save registration", success: false },
      { status: 500 },
    );
  }
}