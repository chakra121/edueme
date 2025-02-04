import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const formDataToSend = new FormData();
  formDataToSend.append("file", file);
  formDataToSend.append("upload_preset", "your_upload_preset"); // Set in Cloudinary
  formDataToSend.append("cloud_name", "your_cloud_name");

  const uploadResponse = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
    method: "POST",
    body: formDataToSend,
  });

  const data = await uploadResponse.json();
  return NextResponse.json({ url: data.secure_url }, { status: 200 });
}
