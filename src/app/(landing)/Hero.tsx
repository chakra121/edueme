import React from "react";
import Link from "next/link";

const Hero = () => {
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

      {/* Content */}
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div>
          <span className="absolute flex w-fit select-none bg-gradient-to-l from-yellow-400 to-orange-400 bg-clip-text pb-[19%] text-center text-7xl font-extrabold text-transparent blur-xl">
            Hello World!
          </span>
          <h1 className="relative top-0 flex h-auto w-fit select-auto bg-gradient-to-l from-yellow-400 to-orange-400 bg-clip-text pb-[19%] text-center text-7xl font-extrabold text-transparent">
            Hello World!
          </h1>
        </div>

        <div>
          <span className="absolute mx-auto flex w-fit select-none bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-center text-4xl font-extrabold text-transparent blur-xl">
            Welcome to Edueme Online
          </span>
          <h1 className="relative top-0 flex h-auto w-fit select-auto bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text pb-[2rem] text-center text-4xl font-extrabold text-transparent">
            Welcome to Edueme Online
          </h1>
        </div>

        <Link
          href="/demoFrom"
          className="relative rounded-md bg-gray-500 px-6 py-3 text-lg font-semibold text-white hover:bg-yellow-500 hover:text-white hover:shadow-lg"
        >
          Book a Free Demo
        </Link>
      </div>
    </div>
  );
};

export default Hero;
