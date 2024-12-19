import { connectDb } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import DemoFormModel from "@/model/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET ?? "your_secret_key"; // Replace in .env

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  await connectDb(); // Connect to MongoDB

  try {
    // Parse and validate the incoming request body
    const body = await request.json() as LoginRequestBody;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required", success: false },
        { status: 400 }
      );
    }

    // Find the user with the given email
    const user = await DemoFormModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // Compare the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password", success: false },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Respond with success and token
    return NextResponse.json(
      { message: "Login successful", success: true, token },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}