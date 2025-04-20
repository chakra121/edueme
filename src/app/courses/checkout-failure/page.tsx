"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function CheckoutFailurePage() {
  // Add animation effect after component mounts
  useEffect(() => {
    // Animate the progress lines
    const lines = document.querySelectorAll('.progress-line');
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('w-full');
      }, 300 * (index + 1)); // Stagger the animations
    });
    
    // Animate the circles
    const circles = document.querySelectorAll('.progress-circle');
    circles.forEach((circle, index) => {
      setTimeout(() => {
        circle.classList.add('scale-100', 'opacity-100');
        // Add robotic glitch effect to circles
        setTimeout(() => {
          circle.classList.add('glitch');
          setTimeout(() => {
            circle.classList.remove('glitch');
          }, 200);
        }, 800 + (index * 100));
      }, 200 * (index + 1)); // Stagger the animations
    });
    
    // Robot error animation for the error icon
    const errorIcon = document.querySelector('.error-icon');
    setTimeout(() => {
      errorIcon?.classList.add('shake');
      
      // Add periodic glitch effect to the error card
      const errorCard = document.querySelector('.error-card');
      const glitchInterval = setInterval(() => {
        errorCard?.classList.add('glitch-effect');
        setTimeout(() => {
          errorCard?.classList.remove('glitch-effect');
        }, 150);
      }, 3000);
      
      return () => clearInterval(glitchInterval);
    }, 1200);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-h-screen min-w-full object-cover"
      >
        <source src="/cfbgv.mp4" type="video/mp4" />
      </video>

      {/* Semi-transparent overlay */}
      <div
        className="absolute top-0 left-0 h-full w-full bg-black/50"
        style={{ zIndex: -1 }}
      ></div>

      <div className="relative z-10 mx-auto px-4 py-12 pt-[5%]">
        <div className="mx-auto max-w-2xl">
          {/* Progress Steps with robotic animation */}
          <div className="mt-4 mb-8 w-full">
            <div className="relative flex items-center justify-between">
              {/* Step 1: Registration */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="progress-circle scale-0 opacity-0 transition-all duration-500 ease-out">
                  <div className="robot-element flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#00ffa0] bg-[#00ffa0] text-black shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="step-label mt-3 text-sm font-bold text-white transition-opacity duration-500">REGISTRATION</span>
              </div>

              {/* Line between Step 1 and 2 */}
              <div className="absolute top-7 left-0 h-2 w-full">
                <div className="progress-line h-2 w-0 bg-[#ffb800] transition-all duration-1000 ease-out"></div>
              </div>

              {/* Step 2: Course Selection */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="progress-circle scale-0 opacity-0 transition-all duration-500 ease-out">
                  <div className="robot-element flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#00ffa0] bg-[#00ffa0] text-black shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="step-label mt-3 text-sm font-bold text-white transition-opacity duration-500">COURSE SELECTION</span>
              </div>

              {/* Line between Step 2 and 3 */}
              <div className="absolute top-7 left-1/2 h-2 w-1/2">
                <div className="progress-line h-2 w-0 bg-gray-300 transition-all duration-1000 ease-out"></div>
              </div>

              {/* Step 3: Payment - Failed */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="progress-circle scale-0 opacity-0 transition-all duration-500 ease-out">
                  <div className="robot-element flex h-14 w-14 items-center justify-center rounded-full border-4 border-red-500 bg-white text-red-500 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="error-icon h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
                <span className="step-label mt-3 text-sm font-bold text-white transition-opacity duration-500">PAYMENT</span>
              </div>
            </div>
          </div>

          {/* Neo Brutalism Error Card */}
          <div className="error-card shadow-brutal relative mb-8 overflow-hidden rounded-2xl border-4 border-black bg-[#ffb800] p-8">
            <div className="circuit-pattern absolute inset-0 opacity-10"></div>

            <div className="mb-8 text-center">
              <div className="flex mb-3 items-center justify-center space-x-4">
                <div className=" inline-flex h-16 w-16 items-center justify-center rounded-full border-4 border-black bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="error-icon h-10 w-10 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h1 className="robot-text text-3xl font-black tracking-wider text-black uppercase">
                  Payment Failed !
                </h1>
              </div>
              <p className="mt-2 text-lg font-bold text-black">
                System unable to process transaction
              </p>
            </div>

            <div className="check-list mb-6 border-t-4 border-b-4 border-black py-4">
              <div className="space-y-2 font-bold text-black">
                <div className="check-list-item flex items-center space-x-2">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    ></path>
                  </svg>
                  <span>Transaction declined by payment processor</span>
                </div>
                <div className="check-list-item flex items-center space-x-2">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>If charged, contact support with payment details</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <Link
                href="/courses"
                className="btn btn-block shadow-brutal-sm rounded-xl border-4 border-black bg-[#00ffa0] py-4 text-center font-black tracking-wider text-black uppercase transition-all hover:translate-y-1 hover:shadow-none"
              >
                Return to Courses
              </Link>

              <Link
                href="/contact"
                className="btn btn-block shadow-brutal-sm rounded-xl border-4 border-black bg-white py-4 text-center font-black tracking-wider text-black uppercase transition-all hover:translate-y-1 hover:shadow-none"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>

        {/* Add CSS for the robotic animations and neo-brutalism style */}
        <style jsx global>{`
          /* Neo Brutalism styling */
          .shadow-brutal {
            box-shadow: 0.5rem 0.5rem 0 #000000;
          }

          .shadow-brutal-sm {
            box-shadow: 0.25rem 0.25rem 0 #000000;
          }

          /* Robot animations */
          .robot-element {
            position: relative;
            overflow: hidden;
          }

          .robot-element::after {
            content: "";
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 100%;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.4),
              transparent
            );
            transform: rotate(25deg);
            animation: scan 4s infinite linear;
          }

          @keyframes scan {
            0% {
              top: -100%;
              left: -100%;
            }
            100% {
              top: 200%;
              left: 200%;
            }
          }

          .robot-text {
            position: relative;
            display: inline-block;
          }

          .glitch {
            animation: glitch 0.2s ease-in-out;
          }

          @keyframes glitch {
            0% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-5px) scale(1.05);
            }
            50% {
              transform: translateX(5px);
            }
            75% {
              transform: translateX(-2px);
            }
            100% {
              transform: translateX(0);
            }
          }

          .shake {
            animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            animation-iteration-count: 2;
          }

          @keyframes shake {
            10%,
            90% {
              transform: translate3d(-1px, 0, 0);
            }

            20%,
            80% {
              transform: translate3d(2px, 0, 0);
            }

            30%,
            50%,
            70% {
              transform: translate3d(-4px, 0, 0);
            }

            40%,
            60% {
              transform: translate3d(4px, 0, 0);
            }
          }

          .glitch-effect {
            position: relative;
          }

          .glitch-effect::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 255, 160, 0.2);
            mix-blend-mode: overlay;
            animation: glitchEffect 0.2s linear;
          }

          @keyframes glitchEffect {
            0% {
              transform: translate(0);
            }
            20% {
              transform: translate(-5px, 5px);
            }
            40% {
              transform: translate(-5px, -5px);
            }
            60% {
              transform: translate(5px, 5px);
            }
            80% {
              transform: translate(5px, -5px);
            }
            100% {
              transform: translate(0);
            }
          }

          .circuit-pattern {
            background-image: linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.1) 1px,
                transparent 1px
              ),
              linear-gradient(0deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `}</style>
      </div>
    </div>
  );
}