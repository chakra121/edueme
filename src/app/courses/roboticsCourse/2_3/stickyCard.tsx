"use client"
import React, { useEffect } from "react";
import Image from "next/image";

export default function StickyCard() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", "pl_PvewnwvDLFZQm3");
    script.async = true;

    const form = document.getElementById("razorpay-form");
    if (form) {
      form.innerHTML = ""; // Clear any previous content to avoid duplicate buttons
      form.appendChild(script);
    }
  }, []);

  return (
    <div className="flex items-center justify-center sm:pb-16 md:items-center md:justify-center md:pb-8">
      <div className="top-20 z-50 w-full rounded-lg border border-gray-300 bg-white p-4 shadow-lg sm:w-[60%] md:w-[50%] lg:fixed lg:right-28 lg:top-24 lg:w-[23%] lg:items-start lg:justify-start">
        <Image
          src="/aboutimg.png"
          className="rounded-lg border py-8"
          alt="Course Image"
          width={450}
          height={450}
        />
        <h3 className="my-3 text-2xl font-semibold text-black">Course Include:</h3>
        <ul className="pl-3">
          <li className="text-lg font-semibold text-black">Certification</li>
          <li className="text-lg font-semibold text-black">Online Classes</li>
          <li className="text-lg font-semibold text-black">Practical Sessions</li>
        </ul>
        <p className="mt-2 text-gray-600">Price: ₹3999</p>

        {/* Razorpay Payment Button */}
        <form id="razorpay-form"></form>

        <p className="text-center font-semibold text-black mt-3">Or</p>

        <button className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:px-6 md:px-8">
          Book a demo!
        </button>
      </div>
    </div>
  );
}
