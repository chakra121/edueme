import { connectDb } from "@/lib/connectDB";
import { NextResponse } from "next/server";

// The POST request handler for registering data
export async function POST(request: Request) {
  // Connect to the MongoDB database
  const client = await connectDb();
  const db = client.db(); // Use the default or specified database

  try {
    // Parse the request JSON body
    const body = await request.json();
    const { name, mobile, email, grade } = body;

    // Validation checks (Optional)
    if (!name || !mobile || !email || !grade) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Insert data into the "registrations" collection
    const collection = db.collection("registrations");
    const result = await collection.insertOne({
      name,
      mobile,
      email,
      grade,
      createdAt: new Date(),
    });

    // Return a success response
    return NextResponse.json(
      { message: "Registration successful", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving registration:", error);
    return NextResponse.json(
      { message: "Failed to save registration" },
      { status: 500 }
    );
  } finally {
    // Close the MongoDB client connection if needed
    await client.close();
  }
}
