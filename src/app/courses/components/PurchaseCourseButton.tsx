// components/PurchaseCourseButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Courses } from "@prisma/client";

interface PurchaseCourseButtonProps {
  course: Courses;
  userId: string;
}

export default function PurchaseCourseButton({
  course,
  userId,
}: PurchaseCourseButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initiatePayment = async () => {
    try {
      setIsLoading(true);

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
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
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
        alert("Failed to load Razorpay. Please try again.");
      };
    } catch (error) {
      console.error("Payment initiation failed:", error);
      setIsLoading(false);
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
          courseId: course.id,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Payment verification failed");
      }

      const { success } = await response.json();

      if (success) {
        router.push(
          `/courses/checkout-success?paymentId=${paymentDetails.razorpay_payment_id}&courseCode=${course.courseCode}`,
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

  return (
    <div className="mt-4 flex items-center justify-center">
      <button
        onClick={initiatePayment}
        disabled={isLoading}
        className="btn btn-primary"
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          `Purchase Course for ₹${course.courseFee}`
        )}
      </button>
    </div>
  );
}
