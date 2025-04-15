// app/courses/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  courseFee: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const { data: session, status } = useSession();

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canPurchase, setCanPurchase] = useState(false);
  const [existingCourseCode, setExistingCourseCode] = useState<string | null>(
    null,
  );
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  useEffect(() => {
    const loadCheckoutData = async () => {
      if (!courseId || status !== "authenticated" || !session?.user?.id) {
        router.push("/courses");
        return;
      }

      try {
        // Check if user can purchase
        const accessResponse = await fetch("/api/buyCourse/check-purchasable");
        if (!accessResponse.ok) {
          throw new Error("Failed to check course access");
        }

        const accessData = await accessResponse.json();
        setCanPurchase(accessData.canPurchase);

        if (!accessData.canPurchase && accessData.existingCourse) {
          // Get the course code for the existing course
          const courseResponse = await fetch(
            `/api/courses/${accessData.existingCourse.courseId}`,
          );
          if (courseResponse.ok) {
            const courseData = await courseResponse.json();
            setExistingCourseCode(courseData.courseCode);
          }
          setIsLoading(false);
          return;
        }

        // Get course details
        const courseResponse = await fetch(`/api/buyCourse/id-param/${courseId}`);
        if (!courseResponse.ok) {
          throw new Error("Failed to load course details");
        }

        const courseData = await courseResponse.json();
        setCourse(courseData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading checkout data:", error);
        setIsLoading(false);
        router.push("/courses");
      }
    };

    loadCheckoutData();
  }, [courseId, router, session, status]);

  const initiatePayment = async () => {
    if (!course || !session?.user?.id || paymentInitiated) return;

    try {
      setIsLoading(true);
      setPaymentInitiated(true);

      // Create an order on the server
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.id,
          courseName: course.courseName,
          courseCode: course.courseCode,
          amount: course.courseFee,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.existingCourseId) {
          setCanPurchase(false);
          setIsLoading(false);
          return;
        }
        throw new Error(errorData.error || "Failed to create order");
      }

      const { orderId, amount } = await response.json();

      // Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100, // Amount in paisa
          currency: "INR",
          name: "Your Education Platform",
          description: `Payment for ${course.courseName}`,
          order_id: orderId,
          handler: async function (response: any) {
            await verifyPayment(response);
          },
          modal: {
            ondismiss: function () {
              // If the payment window is dismissed, redirect to courses page
              router.push(`/courses/${course.courseCode}`);
            },
          },
          prefill: {
            name: "",
            email: "",
            contact: "",
          },
          theme: {
            color: "#F97316", // Orange color
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
        setIsLoading(false);
      };

      script.onerror = () => {
        setIsLoading(false);
        setPaymentInitiated(false);
        alert("Failed to load Razorpay. Please try again.");
      };
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setIsLoading(false);
      setPaymentInitiated(false);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const verifyPayment = async (paymentDetails: any) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/payments/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentDetails.razorpay_payment_id,
          razorpay_order_id: paymentDetails.razorpay_order_id,
          razorpay_signature: paymentDetails.razorpay_signature,
          courseId: course?.id,
          userId: session?.user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment verification failed");
      }

      const { success } = await response.json();

      if (success) {
        router.push(
          `/courses/checkout-success?paymentId=${paymentDetails.razorpay_payment_id}&courseCode=${course?.courseCode}`,
        );
      } else {
        router.push("/courses/checkout-failure");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      setIsLoading(false);
      router.push("/courses/checkout-failure");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Loading checkout information...</p>
        </div>
      </div>
    );
  }

  if (!canPurchase && existingCourseCode) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-base-200 p-6 shadow-lg">
          <div className="alert alert-warning mb-6">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>You have already purchased a course</span>
            </div>
          </div>
          <div className="text-center">
            <p className="mb-4">You can only purchase one course at a time.</p>
            <div className="flex flex-col space-y-3">
              <Link
                href={`/courses/${existingCourseCode}`}
                className="btn btn-primary"
              >
                Go to Your Course
              </Link>
              <Link href="/courses" className="btn btn-outline">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="alert alert-error mb-6">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 flex-shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Course not found</span>
            </div>
          </div>
          <Link href="/courses" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-base-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md overflow-hidden rounded-lg bg-base-200 shadow-lg">
        <div className="bg-base-300 p-6 text-primary-content">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="mt-2">Review your course purchase</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-semibold">{course.courseName}</h2>
            <p className="mb-2 text-sm">Course Code: {course.courseCode}</p>
            <div className="divider"></div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Course Fee:</span>
              <span className="text-xl font-bold">₹{course.courseFee}</span>
            </div>
          </div>

          <div className="alert alert-info mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 flex-shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              You can only purchase one course. This purchase cannot be changed
              later.
            </span>
          </div>

          <div className="flex space-x-4">
            <Link
              href={`/courses/${course.courseCode}`}
              className="btn btn-outline flex-1"
            >
              Cancel
            </Link>
            <button
              onClick={initiatePayment}
              disabled={isLoading || paymentInitiated}
              className="btn btn-primary flex-1"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                `Pay ₹${course.courseFee}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
