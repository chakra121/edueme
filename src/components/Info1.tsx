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

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-yellow-50 to-orange-50 opacity-25"></div>

      {/* Content Layer */}
      <div className="flex h-screen w-full items-center justify-center bg-black">
        <span className="absolute mx-auto box-content flex w-fit select-none border bg-gradient-to-l from-yellow-400 to-orange-400 bg-clip-text pb-[15%] text-center text-7xl font-extrabold text-transparent blur-xl">
          Hello World!
        </span>
        <h1 className="relative top-0 flex h-auto w-fit select-auto items-center justify-center bg-gradient-to-l from-yellow-400 to-orange-500 bg-clip-text pb-[15%] text-center text-7xl font-extrabold text-transparent">
          Hello World!
        </h1>
      </div>
    </div>
  );
};

export default Info1;
