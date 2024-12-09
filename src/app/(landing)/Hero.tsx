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

      {/* Content */}
      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 text-center lg:items-start lg:px-20 lg:text-left">
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:max-w-[60%] lg:text-7xl">
          Welcome to Edueme Online
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
            href={"/"}
            className="flex items-center gap-2 text-lg font-bold text-white hover:underline"
          >
            Join our community <LaunchIcon fontSize="small" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
