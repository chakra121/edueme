import React from "react";
import Link from "next/link";

const Info1 = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-r from-yellow-200 to-orange-400">
      <video
        className="absolute left-0 top-0 h-full w-full object-cover"
        src="/bgVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Light Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-yellow-50 to-orange-50 opacity-25"></div>

      {/* Main Text: Hello World */}
      <div className="relative z-10 flex h-screen w-full items-center justify-center">
        <span className="absolute mx-auto flex w-fit select-none bg-gradient-to-l from-yellow-400 to-orange-400 bg-clip-text pb-[19%] text-center text-7xl font-extrabold text-transparent blur-xl">
          Hello World!
        </span>
        <h1 className="relative top-0 flex h-auto w-fit select-auto bg-gradient-to-l from-yellow-400 to-orange-400 bg-clip-text pb-[19%] text-center text-7xl font-extrabold text-transparent">
          Hello World!
        </h1>
      </div>
      
      <div className="absolute inset-0 bottom-20 z-20 flex items-center justify-center">
        <span className="absolute mx-auto flex w-fit select-none bg-gradient-to-l from-red-500 to-orange-500 bg-clip-text text-center text-4xl font-extrabold text-transparent blur-xl pb-[2rem]">
          Welcome to Edueme Online
        </span>
        <h1 className="relative top-0 flex h-auto w-fit select-auto bg-gradient-to-l from-red-400 to-orange-500 bg-clip-text text-center text-4xl font-extrabold text-transparent pb-[2rem]">
          Welcome to Edueme Online
        </h1>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pt-[75px]">
        <Link
          href="/demoFrom"
          className="z-30 rounded-md bg-gray-500 px-6 py-3 text-lg font-semibold text-white hover:bg-yellow-500 hover:text-white hover:shadow-lg"
        >
          Book a Free Demo
        </Link>
      </div>
    </div>
  );
};

export default Info1;
