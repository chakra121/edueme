"use client";

import { useEffect } from "react";
import Link from "next/link";

const Hero = () => {
  useEffect(() => {
    // Add animation for background or other effects if needed
  }, []);

  return (
    <>
      <style jsx global>{`
        .gallery-text {
          background: url('https://media.giphy.com/media/26BROrSHlmyzzHf3i/giphy.gif') center/cover;
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
        className="sm:py-16 xs:py-12 py-20 h-screen text-center flex flex-col justify-start relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url("/gallbg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="2xl:max-w-[1280px] w-full mx-auto p-4 flex flex-col justify-center items-center relative z-10">
          <div className="flex flex-col justify-center items-center space-y-4 mt-10 md:mt-0">
            <h2 className="gallery-text font-bold text-center text-[70px] lg:text-[90px] xl:text-[90px] 2xl:text-[90px] font-anta drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              Gallery
            </h2>
            <h2 className="font-bold text-center text-[40px] lg:text-[60px] xl:text-[60px] 2xl:text-[60px] font-anta text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Visual Stories of EdueMe
            </h2>
          </div>

          <div className="flex justify-center mt-8 md:mt-12">
            
            <a href="/gall/class" 
              target="_blank" 
              rel="noreferrer"
              className="transform transition-transform hover:scale-105">
              <button className="p-[2px] bg-gradient-to-r from-[#ff3bff] to-[#5C24FF] rounded-[32px]">
                <span className="block bg-black px-8 py-4 text-white text-[18px] font-medium rounded-[30px] hover:bg-opacity-90">
                  Explore
                </span>
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
