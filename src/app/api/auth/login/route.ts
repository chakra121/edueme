import { connectDb } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import StudentModel from "@/model/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import mongoose from 'mongoose'; // Added import

const SECRET_KEY = process.env.JWT_SECRET ?? "your_secret_key";

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    await connectDb();

    const body = await request.json() as LoginRequestBody;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required", success: false },
        { status: 400 }
      );
    }

    const user = await StudentModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email address", success: false },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect password", success: false },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        role: user.userRole, 
        name: `${user.firstName}`
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { 
        message: "Login successful", 
        success: true, 
        token,
        role: user.userRole 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error during login:", error);
    
    // Fixed error checking
    if (error instanceof Error && error.name === 'MongooseServerSelectionError') {
      return NextResponse.json(
        { message: "Database connection failed", success: false },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Server is busy. Please try again.", success: false },
      { status: 500 }
    );
  }
}