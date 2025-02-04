import { NextRequest, NextResponse } from "next/server";

let doubts: { id: number; question: string; image?: string; answer?: string }[] = [];

// ✅ GET - Fetch all doubts
export async function GET() {
  return NextResponse.json(doubts, { status: 200 });
}

// ✅ POST - Add a new doubt
export async function POST(req: NextRequest) {
  const { id, question, image } = await req.json();
  doubts.push({ id, question, image });
  return NextResponse.json({ message: "Doubt added successfully!" }, { status: 201 });
}

// ✅ PUT - Update an answer for a specific doubt
export async function PUT(req: NextRequest) {
  const { id, answer } = await req.json();
  doubts = doubts.map((doubt) => (doubt.id === id ? { ...doubt, answer } : doubt));
  return NextResponse.json({ message: "Answer updated successfully!" }, { status: 200 });
}
