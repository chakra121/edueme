// app/courses/checkout-success/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/globalPrisma";
import Link from "next/link";
import DownloadReceiptButton from "../components/DownloadReceiptButton";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { paymentId: string; courseCode: string };
}) {
  const { paymentId, courseCode } = searchParams;

  if (!paymentId || !courseCode) {
    redirect("/courses");
  }

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  // Get payment details
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
    redirect("/courses");
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-28">
      <div className="mx-auto max-w-2xl rounded-lg border-2 border-green-500 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for purchasing {payment.course.courseName}
          </p>
        </div>

        <div className="mb-6 border-b border-t border-gray-200 py-4">
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600">Payment ID:</span>
            <span className="font-medium">{payment.razorpayPaymentId}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium">₹{payment.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">
              {new Date(payment.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {payment.razorpayPaymentId && (
            <DownloadReceiptButton paymentId={payment.razorpayPaymentId} />
          )}

          <Link
            href={`/courses/${courseCode}`}
            className="btn btn-outline btn-block border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            Go to Course
          </Link>
        </div>
      </div>
    </div>
  );
}