"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Typed from "typed.js";
import { RainbowButton } from "@/components/ui/rainbow-button";
import LaunchIcon from "@mui/icons-material/Launch";

const Hero = () => {
  const typedElement1 = useRef<HTMLSpanElement>(null);
  const typedElement2 = useRef<HTMLSpanElement>(null);
 

  useEffect(() => {
    const typed1 = new Typed(typedElement1.current, {
      strings: ["Welcome to"],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      startDelay: 500,
      loop: false,
      showCursor: false,
    });
    const typed2 = new Typed(typedElement2.current, {
      strings: ["EdueMe"],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      startDelay: 500,
      loop: false,
      showCursor: false,
    });
    

    return () => {
      typed1.destroy();
      typed2.destroy();
   
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-base-100">
      {/* Background Video */}
      <video
        className="absolute left-0 top-0 h-full w-full object-cover opacity-65 dark:opacity-50 dark:brightness-50"
        src="/bgVideo.mp4"
        autoPlay
        loop
        muted
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      <div className="relative z-30 flex h-full text-base-content">
        {/* Left Content */}
        <div className="flex w-full flex-col items-center justify-center gap-6 pl-[60px] text-center lg:w-[63.6%] lg:items-start lg:text-left">
          <h1 className="mb-4 text-6xl font-bold">
            <span ref={typedElement1}></span>{" "}
                        <span
              ref={typedElement2}
              className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-orange-400 bg-clip-text text-7xl text-transparent drop-shadow-[0_0_15px_rgba(249,115,22,0.6)]"
            >
              <span
                ref={typedElement2}
                className="from-yellow-500 absolute inset-0 -z-10 bg-gradient-to-r via-orange-500 to-orange-400 opacity-100 blur-[24px]"
              ></span>
            </span>
          </h1>

          <p className="mb-4 text-lg text-base-content sm:text-xl lg:max-w-[50%] lg:text-2xl">
          "Robotics, AI, and IoT – The RA(I)oT Curriculum for Future Innovators."
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/demoFrom">
              <RainbowButton className="w-fit px-6 py-3 text-lg">
                Book Demo
              </RainbowButton>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold hover:underline"
            >
              Join our community <LaunchIcon fontSize="small" />
            </Link>
          </div>
        </div>

        {/* Right Content */}
        <div className="z-40 flex w-full items-center justify-center lg:w-[34.3%]">
          <div className="card w-full max-w-[90%] bg-base-100 text-base-content shadow-lg">
            <div className="card-body items-center text-center">
              <h2 className="card-title mb-3 text-3xl font-bold">
                Upcoming Events...
              </h2>
              <p className="mb-3">
                Stay tuned for our upcoming events and webinars. We have
                exciting sessions planned to help you dive deeper into Robotics
                and AI.
              </p>
              <div className="card-actions mb-3 justify-center">
                <Link
                  href="./eventAndExpo"
                  className="btn btn-primary text-lg transition duration-300 ease-in-out hover:scale-105"
                >
                  Register Now !!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
