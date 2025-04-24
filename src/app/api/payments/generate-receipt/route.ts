import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/globalPrisma";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const paymentId = request.nextUrl.searchParams.get("paymentId");

    if (!paymentId) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 },
      );
    }

    const payment = await prisma.payment.findFirst({
      where: {
        razorpayPaymentId: paymentId,
        userId: session.user.id,
      },
      include: {
        course: true,
        user: true,
      },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // ✅ Embed custom fonts
    const robotoRegularPath = path.join(
      process.cwd(),
      "public/fonts/Roboto-Regular.ttf",
    );
    const robotoBoldPath = path.join(
      process.cwd(),
      "public/fonts/Roboto-Bold.ttf",
    );

    if (!fs.existsSync(robotoRegularPath) || !fs.existsSync(robotoBoldPath)) {
      throw new Error("Font files not found in /public/fonts.");
    }

    // ✅ Create and configure PDF document
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      font: robotoRegularPath,
    });

    // ✅ Register fonts with names
    doc.registerFont("Roboto-Regular", robotoRegularPath);
    doc.registerFont("Roboto-Bold", robotoBoldPath);

    doc.font("Roboto-Regular");

    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    const pdfPromise = new Promise<Buffer>((resolve) =>
      doc.on("end", () => resolve(Buffer.concat(chunks))),
    );

    // ✅ Compose PDF content
    doc
      .font("Roboto-Bold")
      .fontSize(20)
      .text("Payment Receipt", { align: "center" })
      .moveDown();

    doc
      .font("Roboto-Regular")
      .fontSize(12)
      .text(`Receipt ID: ${payment.receiptId}`)
      .text(`Payment ID: ${payment.razorpayPaymentId}`)
      .text(`Order ID: ${payment.razorpayOrderId}`)
      .text(`Date: ${new Date(payment.createdAt).toLocaleString()}`)
      .moveDown();

    doc
      .font("Roboto-Bold")
      .fontSize(14)
      .text("Customer Information", { underline: true })
      .font("Roboto-Regular")
      .fontSize(12)
      .text(
        `Name: ${payment.user.firstName + " " + payment.user.lastName || "N/A"}`,
      )
      .text(`Email: ${payment.user.email || "N/A"}`)
      .moveDown();

    doc
      .font("Roboto-Bold")
      .fontSize(14)
      .text("Order Details", { underline: true })
      .font("Roboto-Regular")
      .fontSize(12);

    const y = doc.y;
    doc.text("Item", 50, y).text("Price", 400, y);
    doc
      .moveTo(50, doc.y + 5)
      .lineTo(550, doc.y + 5)
      .stroke();

    const itemY = doc.y + 15;
    doc
      .text(payment.course.courseName, 50, itemY)
      .text(`₹${payment.amount.toFixed(2)}`, 400, itemY);
    doc
      .moveTo(50, doc.y + 15)
      .lineTo(550, doc.y + 15)
      .stroke();

    doc
      .text("Total", 300, doc.y + 25)
      .text(`₹${payment.amount.toFixed(2)}`, 400, doc.y + 25)
      .moveDown(2)
      .fontSize(10)
      .text(
        "This is a computer-generated receipt and does not require a signature.",
        {
          align: "center",
        },
      );

    doc.end();
    const pdfBuffer = await pdfPromise;

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="receipt-${paymentId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating receipt:", error);
    return NextResponse.json(
      { error: "Failed to generate receipt" },
      { status: 500 },
    );
  }
}
