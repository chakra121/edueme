import React from "react";
import Image from "next/image";

export default function StickyCard() {
  return (
    <div className="flex items-center justify-center sm:pb-16 md:items-center md:justify-center md:pb-8">
      <div className="top-20 z-50 w-full rounded-lg border border-gray-300 bg-white p-4 shadow-lg sm:w-[60%] md:w-[50%] lg:fixed lg:right-28 lg:top-24 lg:w-[23%] lg:items-start lg:justify-start">
        <Image
          src="/aboutimg.png"
          className="rounded-lg border py-8"
          alt="Image not found"
          width={450}
          height={450}
        ></Image>
        <h3 className="my-3 text-2xl font-semibold text-black">
          Course Include:
        </h3>
        <div className="pl-3">
          <li className="text-lg font-semibold text-black">Certification</li>
          <li className="text-lg font-semibold text-black">Online Classes</li>
          <li className="text-lg font-semibold text-black">
            Practical Sessions
          </li>
        </div>
        <p className="mt-2 text-gray-600">Price: ₹3999</p>

        {/* Responsive Buttons and Centered "Or" */}
        <div className="mt-4 flex flex-col gap-3">
          <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:px-6 md:px-8">
            Enroll Now
          </button>

          <p className="text-center font-semibold text-black">Or</p>

          <button className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 sm:px-6 md:px-8">
            Book a demo!
          </button>
        </div>
      </div>
    </div>
  );
}
