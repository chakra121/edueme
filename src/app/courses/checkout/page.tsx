// app/courses/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  CreditCardIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  LockClosedIcon, // Added for payment button
} from "@heroicons/react/24/solid"; // Using Heroicons for better visuals
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
        setIsLoading(true); // Start loading

        // Redirect immediately if not authenticated
        if (status === "unauthenticated") {
            router.push("/api/auth/signin"); // Or your login page
            return;
        }

        // Wait until session is loaded
        if (status === 'loading') {
            // Still loading session, wait...
            // We'll re-run the effect when status changes
            return;
        }

        // Session is authenticated now, proceed. Check for courseId.
        if (!courseId) {
            console.warn("No courseId found in query params.");
            router.push("/courses");
            return;
        }


        // --- Defensive check for session.user.id ---
        if (!session?.user?.id) {
            console.error("User session loaded but ID is missing.");
            // Handle this case, maybe redirect to login or show error
            router.push("/courses"); // Or an error page
            setIsLoading(false);
            return;
        }
        // --- End defensive check ---


        try {
            // Check if user can purchase
            const accessResponse = await fetch("/api/buyCourse/check-purchasable");
            if (!accessResponse.ok) {
                // Log detailed error if possible
                const errorText = await accessResponse.text();
                console.error("Failed to check course access:", accessResponse.status, errorText);
                throw new Error(`Failed to check course access (status ${accessResponse.status})`);
            }

            const accessData = await accessResponse.json();
            setCanPurchase(accessData.canPurchase);

            if (!accessData.canPurchase && accessData.existingCourse?.courseId) {
                // Get the course code for the existing course
                try {
                    const courseResponse = await fetch(
                        `/api/courses/${accessData.existingCourse.courseId}`,
                    );
                    if (courseResponse.ok) {
                        const courseData = await courseResponse.json();
                        setExistingCourseCode(courseData.courseCode);
                    } else {
                         console.warn(`Failed to fetch existing course details (status ${courseResponse.status}) for courseId: ${accessData.existingCourse.courseId}`);
                         // Even if we fail to get the code, we know they can't purchase.
                         // Proceed without the code, the message will still be shown.
                         setExistingCourseCode('your-course'); // Fallback link
                    }
                } catch (courseError) {
                     console.error("Error fetching existing course details:", courseError);
                     setExistingCourseCode('your-course'); // Fallback link on error
                }
                setIsLoading(false);
                return; // Stop further processing
            } else if (!accessData.canPurchase) {
                // Cannot purchase, but no existing course info (edge case or API issue)
                 console.warn("Cannot purchase course, but no existing course information received.");
                 // Redirect or show a generic message? Redirecting to courses for now.
                 router.push("/courses");
                 return;
            }


            // Get course details for the *selected* course
            const courseResponse = await fetch(`/api/buyCourse/id-param/${courseId}`);
            if (!courseResponse.ok) {
                // Log detailed error
                const errorText = await courseResponse.text();
                console.error("Failed to load course details:", courseResponse.status, errorText);
                throw new Error(`Failed to load course details (status ${courseResponse.status})`);
            }

            const courseData = await courseResponse.json();
            setCourse(courseData);

        } catch (error) {
            console.error("Error loading checkout data:", error);
            // Redirect to courses page on any error during data loading
            router.push("/courses");
        } finally {
             setIsLoading(false); // Stop loading regardless of outcome
        }
    };

    loadCheckoutData();
  }, [courseId, router, session, status]); // Add session and status as dependencies


  const initiatePayment = async () => {
    if (!course || !session?.user?.id || paymentInitiated || isLoading) return;

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
        console.error("Order creation failed:", errorData);
        if (errorData.existingCourseId) {
          // Server detected user already has a course (race condition check)
          setCanPurchase(false);
          // Fetch existing course code again if possible, or use a fallback
           try {
              const courseRes = await fetch(`/api/courses/${errorData.existingCourseId}`);
              if (courseRes.ok) {
                const courseInfo = await courseRes.json();
                setExistingCourseCode(courseInfo.courseCode);
              } else {
                 setExistingCourseCode('your-course');
              }
           } catch {
              setExistingCourseCode('your-course');
           }
          setIsLoading(false);
          setPaymentInitiated(false); // Allow potential retry if state changes
          return;
        }
        throw new Error(errorData.error || "Failed to create order");
      }

      const { orderId, amount } = await response.json();

      // Load Razorpay script dynamically
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        if (!window.Razorpay) {
           console.error("Razorpay SDK not loaded");
           alert("Payment service failed to load. Please try again.");
           setIsLoading(false);
           setPaymentInitiated(false);
           return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100, // Amount in paisa
          currency: "INR",
          name: "Edueme Research Labs",
          description: `Payment for ${course.courseName} (${course.courseCode})`,
          image: "/logo_icon.png", // Ensure this path is correct in /public
          order_id: orderId,
          handler: async function (response: any) {
            await verifyPayment(response);
          },
          modal: {
            ondismiss: function () {
                console.log("Razorpay modal dismissed");
                // Optional: Add a small delay before redirecting or reset state
                // to allow user interaction if needed. For now, directly reset.
                setIsLoading(false);
                setPaymentInitiated(false); // Allow retry if they dismissed
                // Decide if redirect is needed here. Redirecting back might be confusing
                // Maybe stay on the page? If they dismissed, they likely didn't pay.
                // router.push(`/courses/${course.courseCode}`); // Old behavior
            },
             // Prevent closing modal by clicking outside
             escape: false, // Prevent closing modal by pressing Escape key
             backdropclose: false,
          },
          prefill: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            contact: "", // Can potentially prefill if available in user profile
          },
          theme: {
            color: "#4f46e5", // Indigo color, matching primary button typically
          },
          // Ensure notes are serializable if used
          // notes: {
          //     course_id: course.id,
          //     user_id: session.user.id
          // }
        };

        try {
            const razorpay = new (window as any).Razorpay(options);
            razorpay.on('payment.failed', function (response: any){
                console.error("Razorpay payment failed:", response.error);
                // alert(`Payment Failed: ${response.error.description}`);
                // Don't redirect immediately on failure, let verify handle it or show message
                // router.push("/courses/checkout-failure");
                setIsLoading(false); // Stop loading indicator on failure
                setPaymentInitiated(false); // Allow retry
                 // Maybe push to failure page *after* trying verification?
                 // For now, let handler decide.
                 // Redirect to a failure page with more details if possible
                router.push(`/courses/checkout-failure?reason=${encodeURIComponent(response.error.reason)}&orderId=${orderId}`);


            });
            razorpay.open();
             // Don't set isLoading to false here, wait for handler or dismiss/fail
        } catch (rzpError) {
             console.error("Failed to initialize Razorpay:", rzpError);
             alert("Could not initiate payment gateway. Please try again.");
             setIsLoading(false);
             setPaymentInitiated(false);
        }

      };

      script.onerror = () => {
        console.error("Failed to load Razorpay script.");
        setIsLoading(false);
        setPaymentInitiated(false);
        alert("Failed to load payment gateway. Please check your connection and try again.");
      };

      document.body.appendChild(script);

      // Cleanup script tag on component unmount
      return () => {
        const existingScript = document.querySelector(`script[src="${script.src}"]`);
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };


    } catch (error) {
      console.error("Payment initiation failed:", error);
      setIsLoading(false);
      setPaymentInitiated(false);
      alert(`Payment initiation failed: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`);
    }
  };

  const verifyPayment = async (paymentDetails: any) => {
     // Ensure loading state is true for verification step
    setIsLoading(true);
    setPaymentInitiated(true); // Keep payment marked as initiated during verification


    try {
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

       // No need to parse JSON immediately, check status first
       if (!response.ok) {
           const errorBody = await response.text(); // Get raw error response
           console.error("Payment verification API failed:", response.status, errorBody);
           throw new Error(`Payment verification failed (status ${response.status})`);
       }


      const { success } = await response.json();

      if (success) {
        // Clear potentially sensitive query params on success redirect
        router.push(
          `/courses/checkout-success?courseCode=${course?.courseCode}` // Only pass necessary info
        );
      } else {
         console.warn("Payment verification returned success: false");
         // Include order ID for potential debugging on failure page
         router.push(`/courses/checkout-failure?orderId=${paymentDetails.razorpay_order_id}`);
      }
       // No finally block needed here as router.push navigates away
       // isLoading state doesn't matter after navigation
    } catch (error) {
      console.error("Payment verification failed:", error);
      setIsLoading(false); // Set loading false if verification *itself* errors
      setPaymentInitiated(false); // Allow retry if verification failed
      // Include order ID if available
      const orderId = paymentDetails?.razorpay_order_id || 'unknown';
      router.push(`/courses/checkout-failure?orderId=${orderId}&error=verification`);
    }
  };


 // Main container with background image and overlay
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[url('/checkbg.jpeg')] bg-cover bg-center bg-no-repeat mt-16">

      {/* Content Container - sits above overlay */}
      <div className="relative z-10 w-full max-w-lg"> {/* Adjusted max-width */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center rounded-xl bg-base-100/80 backdrop-blur-md p-10 shadow-2xl">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-6 text-lg font-semibold text-base-content">
                {paymentInitiated ? "Processing Payment..." : "Loading Checkout..."}
            </p>
          </div>
        )}

        {!isLoading && !canPurchase && existingCourseCode && (
          <div className="rounded-xl bg-base-100/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl ring-1 ring-base-300/50">
            <div className="alert alert-warning mb-6 shadow-md">
              <ExclamationTriangleIcon className="h-6 w-6 shrink-0" />
              <span className="font-semibold">You Already Have a Course</span>
            </div>
            <div className="text-center text-base-content">
              <p className="mb-6">
                You can only be enrolled in one course at a time. Access your
                existing course or browse others below.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
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
          <div className="rounded-xl bg-base-100/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl ring-1 ring-base-300/50">
            <div className="alert alert-error mb-6 shadow-md">
               <XCircleIcon className="h-6 w-6 shrink-0" />
              <span className="font-semibold">Course Not Found or Error</span>
            </div>
            <div className="text-center text-base-content">
              <p className="mb-6">
                 We couldn't load the details for the selected course. Please try again or select a different course.
              </p>
              <Link href="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
            </div>
          </div>
        )}


        {!isLoading && course && canPurchase && (
          <div className="overflow-hidden rounded-xl bg-base-100/90 backdrop-blur-md shadow-2xl ring-1 ring-black/10">
            {/* Header */}
            <div className={`${styles.shiningHeader} px-6 py-5 text-black`}>
              <h1 className="text-2xl sm:text-3xl font-bold">Secure Checkout</h1>
              <p className="mt-1 text-sm sm:text-md font-semibold opacity-90">
                Complete your course enrollment
              </p>
            </div>

            {/* Course Details & Payment */}
            <div className="space-y-5 p-6 sm:p-8">
              <div>
                <h2 className="text-xl font-semibold text-base-content">{course.courseName}</h2>
                <p className="text-sm text-base-content/70">
                  Course Code: {course.courseCode}
                </p>
              </div>

              <div className="divider my-2"></div>

              <div className="flex items-center justify-between rounded-lg bg-base-200/50 px-4 py-3">
                <span className="text-base font-medium text-base-content">Total Amount</span>
                <span className="text-success text-3xl font-bold">
                  ₹{course.courseFee.toLocaleString("en-IN")}
                </span>
              </div>

              {/* Info Alert */}
              <div className="alert alert-info rounded-lg shadow-sm text-info-content bg-info/20 border border-info/30">
                 <InformationCircleIcon className="h-6 w-6 shrink-0" />
                <span className="text-sm font-medium">
                  Please note: You can only purchase one course. This enrollment is final.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row">
                 <Link
                  href={`/courses/${course.courseCode}`} // Link back to the specific course page
                  className="group relative overflow-hidden btn btn-outline btn-secondary w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-2"
                >
                  <ShineEffect />
                  <ArrowLeftIcon className="h-5 w-5"/>
                  Cancel
                </Link>
                <button
                  onClick={initiatePayment}
                  disabled={isLoading || paymentInitiated}
                  className="group relative overflow-hidden btn btn-primary w-full sm:w-auto sm:flex-1 flex items-center justify-center gap-2"
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
              <div className="text-center text-xs text-base-content/60 mt-4">
                 Payments processed securely by Razorpay.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}