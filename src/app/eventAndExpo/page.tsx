import React from "react";
import Link from "next/link";

export default function RoboticsEvent() {
  return (
    <div className="mb-6 min-h-screen bg-black pt-[6%]">
      <div className="relative px-32">
        <h1 className="text-center text-4xl font-bold text-white">
          Navikarana 1.0
        </h1>
        <h2 className="mb-8 text-center text-2xl font-semibold text-yellow-400">
          Empowering Intelligence
        </h2>
        <div className="mb-6 rounded-lg bg-slate-100 p-6 text-xl font-semibold text-black">
          Mechatronites Club Jointly Ventured with International school to
          conduct national level fest where workshops, semiars and compitions
          are held challenging the young & Sharpest mindsadding the Intellects
          of different schools, colleges and engineers.
        </div>
        <div className="mb-6 grid gap-6 text-black sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col space-y-2 rounded-lg bg-slate-50 p-5">
            <h1 className="text-start text-2xl font-bold">Venue:</h1>
            <p>Arka International School, Hyderabad, Telangana 500112</p>
          </div>
          <div className="flex flex-col space-y-2 rounded-lg bg-slate-50 p-5">
            <h1 className="text-start text-2xl font-bold">Date:</h1>
            <p>3rd & 4th January 2025</p>
          </div>
          <div className="flex flex-col space-y-2 rounded-lg bg-slate-50 p-5">
            <h1 className="text-start text-2xl font-bold">Contact Us:</h1>
            <p>Call us : 9059508050, 70759976623</p>
            <a
              href="https://wa.me/+919059508050"
              className="text-blue-500 underline hover:text-violet-500"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="mb-6 grid gap-6 text-black md:grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col space-y-2 rounded-lg bg-slate-50 p-5">
            <h1 className="text-start text-2xl font-bold">Events:</h1>
            <ul className="text list-inside list-disc pl-3">
              <li>Robotics & AI Expo</li>
              <li>Open Mic</li>
              <li>Guest Talk and Interview</li>
              <li>Show (Entertainment)</li>
              <li>Workshops</li>
            </ul>
          </div>
          <div className="flex flex-col space-y-2 rounded-lg bg-slate-50 p-5">
            <h1 className="text-start text-2xl font-bold">Category:</h1>
            <p>Grade 5 to 12</p>
            <h1 className="text-start text-2xl font-bold">Price Reward:</h1>
            <p>1st Prize: ₹20,000/-</p>
            <p>2nd Prize: ₹15,000/-</p>
            <p>3rd Prize: ₹10,000/-</p>
          </div>
        </div>
        <div className="mb-6 flex flex-col items-center justify-center space-y-4 rounded-lg bg-slate-50 p-5">
          <p className="bg-red-600 px-2 text-3xl font-extrabold text-white">
            Registration Fee : ₹300/-
          </p>
          <Link
            href="https://forms.gle/7RbpBT6USpgXoqot8"
            className="rounded-lg bg-blue-500 p-4 text-2xl font-semibold text-white hover:bg-blue-600"
          >
            Register Now!
          </Link>
        </div>

        <div className="mb-8 mt-3 flex items-center justify-center space-x-1 text-2xl">
          <p className="text-yellow-400">Powered by</p>
          <p className="font-extrabold text-yellow-400">
            Arka International School
          </p>
        </div>
      </div>
    </div>
  );
}
