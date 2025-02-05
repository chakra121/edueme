import React from "react";
import Link from "next/link";

export default function RoboticsEvent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-24 pb-12">
      {/* Hero Section */}
      <div className="px-4 sm:px-8 lg:px-16 animate-fade-in">
        <h1 className="text-center text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Navikarana 1.0
        </h1>
        <h2 className="mt-3 text-center text-2xl font-semibold text-gray-300">
          Empowering Intelligence
        </h2>
      </div>

      {/* Main Content */}
      <div className="mt-12 px-4 sm:px-8 lg:px-16 space-y-8">
        {/* Event Description */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 shadow-lg animate-slide-up">
          <p className="text-lg text-gray-300 leading-relaxed">
            Mechatronites Club Jointly Ventured with International school to
            conduct national level fest where workshops, seminars and competitions
            are held challenging the young & sharpest minds, adding the intellects
            of different schools, colleges and engineers.
          </p>
        </div>

        {/* Key Information Grid */}
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-slide-up">
          {[
            {
              title: "Venue",
              content: "Arka International School, Hyderabad, Telangana 500112",
              icon: "📍"
            },
            {
              title: "Date",
              content: "3rd & 4th January 2025",
              icon: "📅"
            },
            {
              title: "Contact Us",
              content: (
                <>
                  <p>Call us: 9059508050, 70759976623</p>
                  <a
                    href="https://wa.me/+919059508050"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Chat on WhatsApp
                  </a>
                </>
              ),
              icon: "📞"
            }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-yellow-400 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{item.icon}</span>
                <h2 className="text-2xl font-bold text-yellow-400">{item.title}</h2>
              </div>
              <div className="text-gray-300">{item.content}</div>
            </div>
          ))}
        </div>

        {/* Events and Prizes Section */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 animate-slide-up">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Events</h2>
            <ul className="space-y-3 text-gray-300">
              {[
                "Robotics & AI Expo",
                "Open Mic",
                "Guest Talk and Interview",
                "Show (Entertainment)",
                "Workshops"
              ].map((event, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-yellow-400">•</span>
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Category</h2>
            <p className="text-gray-300 mb-6">Grade 5 to 12</p>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Price Reward</h2>
            <div className="space-y-3 text-gray-300">
              <p>1st Prize: ₹20,000/-</p>
              <p>2nd Prize: ₹15,000/-</p>
              <p>3rd Prize: ₹10,000/-</p>
            </div>
          </div>
        </div>

        {/* Registration Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl text-center animate-slide-up">
          <p className="text-2xl font-bold text-gray-900 mb-4">
            Registration Fee: ₹300/-
          </p>
          <Link
            href="https://forms.gle/7RbpBT6USpgXoqot8"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Register Now!
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 animate-fade-in">
          <p className="text-xl">
            Powered by{" "}
            <span className="font-bold text-yellow-400">
              Arka International School
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}