import { connectDb } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import DemoFormModel from "@/model/User";
import bcrypt from "bcrypt";

// Interface for request body
interface SignupRequestBody {
  name: string;
  phoneNumber: string;
  email: string;
  grade: string;
  password: string;
}

export async function POST(request: Request) {
  await connectDb(); // Connect to MongoDB

  try {
    // Parse and validate the incoming request body
    const body = await request.json() as SignupRequestBody;
    const { name, phoneNumber, email, grade, password } = body;

    // Input validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format", success: false },
        { status: 400 }
      );
    }

    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { message: "Phone number must be 10 digits", success: false },
        { status: 400 }
      );
    }

    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long", success: false },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await DemoFormModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email", success: false },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user data into the database
    const newUser = await DemoFormModel.create({
      name,
      phoneNumber,
      email,
      grade,
      password: hashedPassword,
    });

    // Respond with success
    return NextResponse.json(
      { message: "User registered successfully", success: true, user: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
