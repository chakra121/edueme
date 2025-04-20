// app/courses/checkout-success/page.tsx
import React from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/globalPrisma";
import Link from "next/link";
import DownloadReceiptButton from "../components/DownloadReceiptButton";
import ConfettiEffect from "./Confetti"; // Corrected import name based on filename
// Ensure you have the necessary CSS in globals.css or imported here

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { paymentId: string; courseCode: string };
}) {
  const { paymentId, courseCode } = searchParams;

  if (!paymentId || !courseCode) {
    console.warn("Missing paymentId or courseCode in searchParams");
    redirect("/courses");
  }

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    // Redirect to sign-in but include a callbackUrl to come back here after login
    // FIXED: Used backticks (`) for template literal string construction
    const callbackUrl = `/courses/checkout-success?paymentId=${paymentId}&courseCode=${courseCode}`;
    // FIXED: Used backticks (`) for template literal string construction
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  // Get payment details
  const payment = await prisma.payment.findFirst({
    where: {
      razorpayPaymentId: paymentId,
      userId: session.user.id, // Ensure payment belongs to the logged-in user
      course: { // Also ensure the courseCode matches the payment's related course
        courseCode: courseCode,
      }
    },
    include: {
      course: true, // Include course details
      user: true,   // Include user details (optional, might not be needed for display)
    },
  });

  // If payment not found OR doesn't belong to the user OR doesn't match the courseCode, redirect
  // (The Prisma query already checks courseCode match, but this adds an explicit layer)
  if (!payment) { // Simplified check as Prisma query includes courseCode validation
    console.warn(`Payment not found or mismatch for user ${session.user.id}, paymentId ${paymentId}, courseCode ${courseCode}`);
    redirect("/courses?error=payment_not_found"); // Redirect with an error indicator
  }

  // --- Progress Bar Data ---
  // Since this is the success page, all steps are considered complete.
  const steps = [
    { name: "REGISTRATION", status: "complete" },
    { name: "COURSE SELECTION", status: "complete" },
    { name: "PAYMENT", status: "complete" },
    { name: "SUCCESS", status: "complete"}, // Payment is successful here
  ];

  return (
    <div className="container mx-auto px-4 py-12 pt-20 md:pt-28"> {/* Adjusted top padding */}
      {/* Render Confetti Effect - it will attach globally */}
      <ConfettiEffect />

      {/* Progress Steps */}
      <div className="relative z-10 mx-auto mb-10 max-w-3xl"> {/* Increased max-width slightly */}
        <div className="relative flex items-center justify-between"> {/* Changed to items-center for better alignment */}
          {/* Connecting Lines - Rendered as a separate continuous element */}
          <div className="absolute top-6 left-0 right-0 h-2 w-full"> {/* Positioned vertically centered on circles */}
            <div className="relative h-1.5 w-full bg-gray-300">
              {/* Filled portion of the progress bar */}
              <div className="absolute left-0 top-0 h-full w-full bg-green-500"></div>
            </div>
          </div>

          {/* Step Items */}
          {steps.map((step, index) => (
            <div key={step.name} className="relative z-10 flex flex-col items-center">
              <div
                className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border-4 shadow-lg transition-all duration-500 ease-out
                  ${step.status === 'complete' ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-white text-gray-400'}
                `}
              >
                {/* Checkmark Icon for completed steps */}
                {step.status === 'complete' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3} // Make checkmark thicker
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-600 md:text-sm">
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Success Message Box */}
      <div className="mx-auto max-w-2xl rounded-lg border-2 border-green-500 bg-white p-6 md:p-8 shadow-lg">
        <div className="mb-6 md:mb-8 text-center">
          {/* Checkmark Icon (Larger) */}
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="mt-2 text-base md:text-lg text-gray-600">
            Thank you for purchasing{' '}
            {/* Added optional chaining ?. just in case course somehow isn't included, though it should be */}
            <span className="font-semibold">{payment.course?.courseName ?? 'the course'}</span>!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            You now have access to the course materials.
          </p>
        </div>

        {/* Payment Details */}
        <div className="mb-6 border-b border-t border-gray-200 py-4">
          <div className="mb-2 flex flex-wrap justify-between text-sm md:text-base">
            <span className="text-gray-600">Payment ID:</span>
            <span className="font-medium text-gray-800 break-all">{payment.razorpayPaymentId}</span>
          </div>
          <div className="mb-2 flex justify-between text-sm md:text-base">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium text-gray-800">
              ₹{payment.amount.toLocaleString('en-IN')} {/* Format currency */}
            </span>
          </div>
          <div className="flex justify-between text-sm md:text-base">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium text-gray-800">
              {new Date(payment.createdAt).toLocaleDateString('en-GB', { // Example: DD/MM/YYYY
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 md:space-y-4">
          {/* Ensure DownloadReceiptButton component exists and accepts paymentId */}
          {payment.razorpayPaymentId && (
            <DownloadReceiptButton paymentId={payment.razorpayPaymentId} />
          )}

          <Link
            // Use the validated courseCode from the payment object for consistency
            href={`/courses/${payment.course.courseCode}`}
            className="btn btn-primary btn-block text-white" // Use primary button style (assumes DaisyUI is set up)
          >
            Go to My Course
          </Link>

        </div>
      </div>
    </div>
  );
}