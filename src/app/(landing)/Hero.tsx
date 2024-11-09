import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-r">
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
      <div className="h-screen">
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default Hero;
