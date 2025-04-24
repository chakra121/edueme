"use client";

import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    // Add animation for background or other effects if needed
  }, []);

  return (
    <>
      <style jsx global>{`
        .gallery-text {
          background: url("https://media.giphy.com/media/26BROrSHlmyzzHf3i/giphy.gif")
            center/cover;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          animation: shine 8s linear infinite;
          filter: brightness(1.5) contrast(1.2);
        }
        @keyframes shine {
          from {
            background-position: 0%;
          }
          to {
            background-position: 100%;
          }
        }
      `}</style>
      <section
        className="relative flex min-h-144 flex-col justify-start text-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url("/gallbg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center ">
          <h2 className="gallery-text font-anta text-center text-[70px] font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] lg:text-[90px] xl:text-[90px] 2xl:text-[90px]">
            Gallery
          </h2>
        </div>
      </section>
    </>
  );
};

export default Hero;
