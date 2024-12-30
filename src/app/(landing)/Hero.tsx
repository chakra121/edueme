import React from "react";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import LaunchIcon from "@mui/icons-material/Launch";
const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-r">
      {/* Background Video */}
      <video
        className="absolute left-0 top-0 -z-50 h-full w-full object-cover opacity-20"
        src="/bgVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>
      <div className="flex h-full">
        {/* Left Content (2/3 of the width) */}
        <div className="flex w-full flex-col items-center justify-center gap-6 pl-[60px] text-center lg:w-[63.6%] lg:items-start lg:text-left">
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:max-w-[60%] lg:text-7xl">
            Welcome to EdueMe Online
          </h1>
          <p className="mt-4 text-lg text-gray-200 sm:text-xl lg:max-w-[50%] lg:text-2xl">
            Robotics and AI Curriculum for the Future Innovators
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/demoFrom">
              <RainbowButton className="w-fit px-6 py-3 text-lg">
                Book Demo
              </RainbowButton>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-white hover:underline"
            >
              Join our community <LaunchIcon fontSize="small" />
            </Link>
          </div>
        </div>

        {/* Right Content (1/3 of the width) */}
        <div className="flex w-full items-center justify-center lg:w-[34.3%]">
          <div className="flex w-full max-w-[90%] flex-col rounded-lg bg-white p-6 text-center shadow-lg">
            <h2 className="text-3xl font-bold text-black">
              Upcoming Events...
            </h2>
            <p className="mt-4 text-gray-600">
              Stay tuned for our upcoming events and webinars. We have exciting
              sessions planned to help you dive deeper into Robotics and AI.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <Link
                href="./eventAndExpo"
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-center text-lg text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-teal-700"
              >
                Register Now !!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
