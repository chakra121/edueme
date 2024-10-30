import React from "react";

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

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-yellow-50 to-orange-50 opacity-30"></div>

      {/* Content Layer */}
      <div className="relative z-20 flex h-full items-center justify-center">
        <h1 className="text-4xl font-bold text-black">Hello World!</h1>
        <h2 className="text-3xl font-bold text-black">Welcome to Edueme</h2>
      </div>
    </div>
  );
};

export default Info1;
