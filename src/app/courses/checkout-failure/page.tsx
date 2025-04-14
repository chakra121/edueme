// app/courses/checkout-failure/page.tsx
import Link from "next/link";

export default function CheckoutFailurePage() {
  return (
    <div className="container mx-auto px-4 py-12 pt-[5%]">
      <div className="mx-auto max-w-2xl rounded-lg border-2 border-red-500 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Payment Failed</h1>
          <p className="mt-2 text-lg text-gray-600">
            We couldn't process your payment. Please try again.
          </p>
        </div>

        <div className="mb-6 border-b border-t border-gray-200 py-4">
          <p className="text-gray-600">
            If you were charged but still seeing this error, please contact our
            support team with your payment details.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <Link
            href="/courses"
            className="btn btn-block bg-orange-500 text-white hover:bg-orange-600"
          >
            Return to Courses
          </Link>

          <Link
            href="/contact"
            className="btn btn-outline btn-block border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
