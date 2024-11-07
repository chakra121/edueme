import React from 'react'
import "./logo.css";
require("./logo.js");

const Logos = () => {
  return (
    <div className="relative overflow-hidden bg-blue-900 py-10">
      <h2 className="mb-6 text-center text-xl font-bold text-white">
        Our Schools:
      </h2>

      {/* <!-- Marquee container --> */}
      <div className="overflow-hidden whitespace-nowrap">
        {/* <!-- Marquee content with logos --> */}
        <div className="marquee animate-scroll inline-flex space-x-8">
          {/* <!-- Logo items --> */}
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/schools/logo1.png" alt="Logo 1" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo2.png" alt="Logo 2" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo3.png" alt="Logo 3" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo4.png" alt="Logo 4" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo5.png" alt="Logo 5" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo6.png" alt="Logo 6" className="h-12 w-auto" />
          </div>
          {/* <!-- Repeat logos as needed --> */}

          {/* <!-- Duplicate logos for seamless looping --> */}
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo1.png" alt="Logo 1" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo2.png" alt="Logo 2" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo3.png" alt="Logo 3" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo4.png" alt="Logo 4" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo5.png" alt="Logo 5" className="h-12 w-auto" />
          </div>
          <div className="flex-shrink-0 rounded-md bg-white p-4 shadow-md">
            <img src="/logo6.png" alt="Logo 6" className="h-12 w-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logos