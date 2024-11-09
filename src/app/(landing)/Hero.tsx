import React from "react";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";
import LaunchIcon from '@mui/icons-material/Launch';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-r">
      <video
        className="absolute left-0 top-0 h-full w-full object-cover -z-50 opacity-20"
        src="/bgVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="h-screen flex flex-col justify-center px-[1rem] lg:px-[10%] gap-[1rem]">
        <h1 className="text-6xl lg:text-8xl lg:max-w-[60%] text-balance font-bold">Edueme Research Labs</h1>
        <p className="mt-4 text-balance">
          Robotics and AI Curriculum for the Future Innovators
        </p>
        <div className="flex gap-[1rem] items-center">
        <RainbowButton className="w-fit">Book Demo</RainbowButton>
        <Link href={"/"} className="font-bold">Join our community <LaunchIcon /></Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
