import React from "react";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import LaunchIcon from '@mui/icons-material/Launch';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-r">
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
      <div className="flex h-screen flex-col justify-center gap-[1rem] px-[1rem] lg:px-[10%]">
        <h1 className="text-balance text-6xl font-bold lg:max-w-[60%] lg:text-8xl">
          Welcome to Edueme Online
        </h1>
        <p className="mt-4 text-balance">
          Robotics and AI Curriculum for the Future Innovators
        </p>
        <div className="flex items-center gap-[1rem]">
          <Link href='/demoFrom'>
            <RainbowButton className="w-fit">Book Demo</RainbowButton>
          </Link>
          <Link href={"/"} className="font-bold">
            Join our community <LaunchIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
