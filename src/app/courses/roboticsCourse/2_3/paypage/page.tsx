"use client";

import React, { useState } from "react";
import Script from "next/script";

const PaymentPage = () => {
  const AMOUNT = 100; // ₹100
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/create-order", { method: "POST" });

      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: AMOUNT * 100,
        currency: "INR",
        name: "Edueme",
        description: "Course Registration",
        order_id: data.orderId,
        handler: function (response: any) {
          console.log("Payment successful", response);
        },
        prefill: {
          name: "Edueme",
          email: "test@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#F5A623",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/ai-generated-8762054_1920.png')" }}
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="p-8 bg-white/90 rounded-3xl shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-6">
          Confirm your Payment
        </h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Enrolling for 2-3 Robotics
        </p>

        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-gray-700">Robotics Course</h2>
          <p className="text-lg font-semibold text-green-500">₹{AMOUNT}</p>
        </div>

        <div className="text-center">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="relative w-fit px-6 py-3 text-lg text-white font-medium rounded-lg shadow-md bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transition-all duration-200 hover:scale-105 disabled:bg-gray-400"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
