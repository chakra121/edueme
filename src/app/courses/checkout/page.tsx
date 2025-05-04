// app/courses/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  LockClosedIcon, 
} from "@heroicons/react/24/solid"; 
import styles from './header.module.css';

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  courseFee: number;
}

const ShineEffect = () => (
  <div 
    className="absolute top-0 -left-[70px] h-full w-[50px] 
    bg-white/40 transition-all duration-300 ease-linear 
    transform skew-x-[20deg] translate-x-0 
    group-hover:translate-x-[300px]"
  />
);

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
        interface AccessData {
          canPurchase: boolean;
          existingCourse?: { courseId: string };
        }

        const accessData = (await accessResponse.json()) as AccessData;
        setCanPurchase(accessData.canPurchase);

        if (!accessData.canPurchase && accessData.existingCourse) {
          // Get the course code for the existing course
          const courseResponse = await fetch(
            `/api/courses/${accessData.existingCourse.courseId}`,
          );
          if (courseResponse.ok) {
            interface CourseData {
              courseCode: string;
            }
            const courseData = (await courseResponse.json()) as CourseData;
            setExistingCourseCode(courseData.courseCode);
          }
          setIsLoading(false);
          return;
        }
        //Get course details
        const courseResponse = await fetch(
          `/api/buyCourse/id-param/${courseId}`,
        );
        if (!courseResponse.ok) {
          throw new Error("Failed to load course details");
        }

        const courseData = (await courseResponse.json()) as Course;
        setCourse(courseData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading checkout data:", error);
        setIsLoading(false);
        router.push("/courses");
      }
    };

    void loadCheckoutData();
  }, [courseId, router, session, status]); // Add session and status as dependencies

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
        interface ErrorData {
          existingCourseId?: string;
          error?: string;
        }
        const errorData = (await response.json()) as ErrorData;

        if (errorData.existingCourseId) {
          setCanPurchase(false);

          setIsLoading(false); // Allow potential retry if state changes
          return;
        }
        throw new Error(errorData.error ?? "Failed to create order");
      }

      interface CreateOrderResponse {
        orderId: string;
        amount: number;
      }
      const { orderId, amount } =
        (await response.json()) as CreateOrderResponse;

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
          name: "Edueme Research Labs",
          description: `Payment for ${course.courseName}`,
          image: "/logo_icon.png", // Ensure this path is correct in /public
          order_id: orderId,
          handler: async function (response: unknown) {
            await verifyPayment(response as PaymentDetails);
          },
          modal: {
            ondismiss: function () {
              // If the payment window is dismissed, redirect to courses page
              router.push(`/courses/${course.courseCode}`);
            },
          },
          prefill: {
            name: session?.user?.name ?? "",
            email: session?.user?.email ?? "",
            contact: "",
          },
          theme: {
            color: "636#f1", // Indigo color, matching primary button typically
          },
        };

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        const razorpay = new (window as any).Razorpay(options);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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

  interface PaymentDetails {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }

  const verifyPayment = async (paymentDetails: PaymentDetails) => {
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

      interface VerifyPaymentResponse {
        success: boolean;
      }
      const { success } = (await response.json()) as VerifyPaymentResponse;

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

  // Main container with background image and overlay
  return (
    <div className="relative mt-16 flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[url('/checkbg.jpeg')] bg-cover bg-center bg-no-repeat p-4">
      {/* Content Container - sits above overlay */}
      <div className="relative z-10 w-full max-w-lg">
        {" "}
        {/* Adjusted max-width */}
        {isLoading && (
          <div className="bg-base-100/80 flex flex-col items-center justify-center rounded-xl p-10 shadow-2xl backdrop-blur-md">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="text-base-content mt-6 text-lg font-semibold">
              {paymentInitiated
                ? "Processing Payment..."
                : "Loading Checkout..."}
            </p>
          </div>
        )}
        {!isLoading && !canPurchase && existingCourseCode && (
          <div className="bg-base-100/90 ring-base-300/50 rounded-xl p-6 shadow-2xl ring-1 backdrop-blur-md sm:p-8">
            <div className="alert alert-warning mb-6 shadow-md">
              <ExclamationTriangleIcon className="h-6 w-6 shrink-0" />
              <span className="font-semibold">You Already Have a Course</span>
            </div>
            <div className="text-base-content text-center">
              <p className="mb-6">
                You can only be enrolled in one course at a time. Access your
                existing course or browse others below.
              </p>
              <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Link
                  href={`/courses/${existingCourseCode}`}
                  className="btn btn-primary flex-1" // Added flex-1 for better spacing on mobile
                >
                  Go to Your Course
                </Link>
                <Link href="/courses" className="btn btn-outline flex-1">
                  Browse Other Courses
                </Link>
              </div>
            </div>
          </div>
        )}
        {!isLoading && !course && (!existingCourseCode || canPurchase) && (
          // This state implies loading finished, but course is null AND
          // it's not the "already purchased" scenario. Likely an error fetching course details.
          <div className="bg-base-100/90 ring-base-300/50 rounded-xl p-6 shadow-2xl ring-1 backdrop-blur-md sm:p-8">
            <div className="alert alert-error mb-6 shadow-md">
              <XCircleIcon className="h-6 w-6 shrink-0" />
              <span className="font-semibold">Course Not Found or Error</span>
            </div>
            <div className="text-base-content text-center">
              <p className="mb-6">
                We couldn&apos;t load the details for the selected course.
                Please try again or select a different course.
              </p>
              <Link href="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          </div>
        )}
        {!isLoading && course && canPurchase && (
          <div className="bg-base-100/90 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10 backdrop-blur-md">
            {/* Header */}
            <div className={`${styles.shiningHeader} px-6 py-5 text-black`}>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Secure Checkout
              </h1>
              <p className="sm:text-md mt-1 text-sm font-semibold opacity-90">
                Complete your course enrollment
              </p>
            </div>

            {/* Course Details & Payment */}
            <div className="space-y-5 p-6 sm:p-8">
              <div>
                <h2 className="text-base-content text-xl font-semibold">
                  {course.courseName}
                </h2>
                <p className="text-base-content/70 text-sm">
                  Course Code: {course.courseCode}
                </p>
              </div>

              <div className="divider my-2"></div>

              <div className="bg-base-200/50 flex items-center justify-between rounded-lg px-4 py-3">
                <span className="text-base-content text-base font-medium">
                  Total Amount
                </span>
                <span className="text-success text-3xl font-bold">
                  ₹{course.courseFee.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Info Alert */}
              <div className="alert alert-info text-info-content bg-info/20 border-info/30 rounded-lg border shadow-sm">
                <InformationCircleIcon className="h-6 w-6 shrink-0" />
                <span className="text-sm font-medium">
                  Please note: You can only purchase one course. This enrollment
                  is final.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
                <Link
                  href={`/courses/${course.courseCode}`} // Link back to the specific course page
                  className="group btn btn-outline btn-secondary relative flex w-full items-center justify-center gap-2 overflow-hidden sm:w-auto sm:flex-1"
                >
                  <ShineEffect />
                  <ArrowLeftIcon className="h-5 w-5" />
                  Cancel
                </Link>
                <button
                  onClick={initiatePayment}
                  disabled={isLoading || paymentInitiated}
                  className="group btn btn-primary relative flex w-full items-center justify-center gap-2 overflow-hidden sm:w-auto sm:flex-1"
                >
                  <ShineEffect />
                  {isLoading || paymentInitiated ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <LockClosedIcon className="h-5 w-5" />
                      {`Pay Securely ₹${course.courseFee.toLocaleString("en-IN")}`}
                    </>
                  )}
                </button>
              </div>
              <div className="text-base-content/60 mt-4 text-center text-xs">
                Payments processed securely by Razorpay.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}