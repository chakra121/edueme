// app/courses/checkout-success/page.tsx
"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { paymentId: string; courseCode: string };
}) {
  const router = useRouter();
  const { paymentId, courseCode } = searchParams;
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Mock payment data (replace with actual data fetching logic)
  const payment = {
    razorpayPaymentId: paymentId || "PAY123456789",
    amount: 999,
    createdAt: new Date(),
    course: {
      courseName: "Sample Course Name"
    }
  };

  // Confetti function
  const Confettiful = function(el: HTMLElement) {
    let containerEl: HTMLDivElement | null = null;
    const confettiFrequency = 3;
    const confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
    const confettiAnimations = ['slow', 'medium', 'fast'];
    let confettiInterval: NodeJS.Timeout;
    
    // Setup elements
    const setupElements = () => {
      containerEl = document.createElement('div');
      const elPosition = window.getComputedStyle(el).position;
      
      if (elPosition !== 'relative' && elPosition !== 'absolute') {
        el.style.position = 'relative';
      }
      
      containerEl.classList.add('confetti-container');
      el.appendChild(containerEl);
      confettiContainerRef.current = containerEl;
    };
    
    // Render confetti
    const renderConfetti = () => {
      confettiInterval = setInterval(() => {
        if (!containerEl) return;
        
        const confettiEl = document.createElement('div');
        const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
        const confettiBackground = confettiColors[Math.floor(Math.random() * confettiColors.length)] ?? '#EF2964';
        const confettiLeft = (Math.floor(Math.random() * el.offsetWidth)) + 'px';
        const confettiAnimation = confettiAnimations[Math.floor(Math.random() * confettiAnimations.length)];
        
        confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
        confettiEl.style.left = confettiLeft;
        confettiEl.style.width = confettiSize;
        confettiEl.style.height = confettiSize;
        confettiEl.style.backgroundColor = confettiBackground;
        
        setTimeout(function() {
          if (confettiEl.parentNode) {
            confettiEl.parentNode.removeChild(confettiEl);
          }
        }, 3000);
        
        containerEl.appendChild(confettiEl);
      }, 25);
    };
    
    // Initialize
    setupElements();
    renderConfetti();
    
    // Return stop function
    return {
      stop: () => {
        if (confettiInterval) {
          clearInterval(confettiInterval);
        }
        if (containerEl && containerEl.parentNode) {
          containerEl.parentNode.removeChild(containerEl);
        }
      }
    };
  };

  useEffect(() => {
    if (!paymentId || !courseCode) {
      router.push("/courses");
      return;
    }

    // Add styles for confetti
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      @keyframes confetti-slow {
        0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
        100% { transform: translate3d(25px, 105vh, 0) rotateX(360deg) rotateY(180deg); }
      }
      
      @keyframes confetti-medium {
        0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
        100% { transform: translate3d(100px, 105vh, 0) rotateX(100deg) rotateY(360deg); }
      }
      
      @keyframes confetti-fast {
        0% { transform: translate3d(0, 0, 0) rotateX(0) rotateY(0); }
        100% { transform: translate3d(-50px, 105vh, 0) rotateX(10deg) rotateY(250deg); }
      }
      
      .confetti-container {
        perspective: 700px;
        position: absolute;
        overflow: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
      }
      
      .confetti {
        position: absolute;
        z-index: 1;
        top: -10px;
        border-radius: 0%;
      }
      
      .confetti--animation-slow {
        animation: confetti-slow 2.25s linear 1 forwards;
      }
      
      .confetti--animation-medium {
        animation: confetti-medium 1.75s linear 1 forwards;
      }
      
      .confetti--animation-fast {
        animation: confetti-fast 1.25s linear 1 forwards;
      }
      
      /* Checkmark animation */
      @keyframes checkmark {
        0% {
          height: 0;
          width: 0;
          opacity: 1;
        }
        20% {
          height: 0;
          width: 37.5px;
          opacity: 1;
        }
        40% {
          height: 75px;
          width: 37.5px;
          opacity: 1;
        }
        100% {
          height: 75px;
          width: 37.5px;
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styleElement);

    // Animate progress steps when component mounts
    const circles = document.querySelectorAll('.progress-circle');
    const lines = document.querySelectorAll('.progress-line');
    const labels = document.querySelectorAll('.step-label');

    // Step 1 animation
    setTimeout(() => {
      if (circles[0]) circles[0].classList.add('scale-100', 'opacity-100');
      if (labels[0]) labels[0].classList.add('opacity-100');
    }, 300);

    // Step 1 to Step 2 line animation
    setTimeout(() => {
      if (lines[0]) lines[0].classList.add('w-full');
    }, 600);

    // Step 2 animation
    setTimeout(() => {
      if (circles[1]) circles[1].classList.add('scale-100', 'opacity-100');
      if (labels[1]) labels[1].classList.add('opacity-100');
    }, 900);

    // Step 2 to Step 3 line animation
    setTimeout(() => {
      if (lines[1]) lines[1].classList.add('w-full');
    }, 1200);

    // Step 3 animation
    setTimeout(() => {
      if (circles[2]) circles[2].classList.add('scale-100', 'opacity-100');
      if (labels[2]) labels[2].classList.add('opacity-100');
    }, 1500);

    // Step 3 to Step 4 line animation
    setTimeout(() => {
      if (lines[2]) lines[2].classList.add('w-full');
    }, 1800);

    // Step 4 animation
    setTimeout(() => {
      if (circles[3]) circles[3].classList.add('scale-100', 'opacity-100');
      if (labels[3]) labels[3].classList.add('opacity-100');

      // Start confetti animation after progress bar completes
      setTimeout(() => {
        if (containerRef.current) {
          const confetti = Confettiful(containerRef.current);
          
          // Stop confetti after 5 seconds
          setTimeout(() => {
            confetti.stop();
          }, 5000);
        }
      }, 300); // Small delay after the last step animation completes
    }, 2100);

    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
      if (confettiContainerRef.current && confettiContainerRef.current.parentNode) {
        confettiContainerRef.current.parentNode.removeChild(confettiContainerRef.current);
      }
    };
  }, [paymentId, courseCode, router]);

  if (!paymentId || !courseCode) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-28" ref={containerRef}>
      {/* Progress Steps with Animation */}
      <div className="mx-auto mb-12 max-w-3xl">
        <div className="mt-4 mb-8 w-full">
          <div className="relative flex items-center justify-between">
            {/* Continuous progress bar - behind circles */}
            <div className="absolute top-7 left-0 right-0 h-2 bg-gray-200">
              <div className="flex h-full w-full">
                {/* First segment */}
                <div className="w-1/3 h-full">
                  <div className="progress-line h-full w-0 bg-[#00ffa0] transition-all duration-1000 ease-out"></div>
                </div>
                {/* Second segment */}
                <div className="w-1/3 h-full">
                  <div className="progress-line h-full w-0 bg-[#00ffa0] transition-all duration-1000 ease-out"></div>
                </div>
                {/* Third segment */}
                <div className="w-1/3 h-full">
                  <div className="progress-line h-full w-0 bg-[#00ffa0] transition-all duration-1000 ease-out"></div>
                </div>
              </div>
            </div>
            
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
              <span className="step-label mt-3 text-sm font-bold text-gray-800 opacity-0 transition-opacity duration-500">REGISTRATION</span>
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
              <span className="step-label mt-3 text-sm font-bold text-gray-800 opacity-0 transition-opacity duration-500">COURSE SELECTION</span>
            </div>

            {/* Step 3: Payment */}
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
              <span className="step-label mt-3 text-sm font-bold text-gray-800 opacity-0 transition-opacity duration-500">PAYMENT</span>
            </div>

            {/* Step 4: Success */}
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
              <span className="step-label mt-3 text-sm font-bold text-gray-800 opacity-0 transition-opacity duration-500">SUCCESS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column layout for success content and image */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:gap-12 lg:gap-20">
          {/* Left Column - Success Content */}
          <div className="w-full md:w-1/2">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800">
                Payment Successful!
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Thank you for purchasing {payment.course.courseName}
              </p>
            </div>

            {/* Payment Details */}
            <div className="mb-8 border-b border-t border-gray-200 py-6">
              <div className="mb-4 flex justify-between">
                <span className="text-gray-600 font-medium">Payment ID:</span>
                <span className="font-medium">{payment.razorpayPaymentId}</span>
              </div>
              <div className="mb-4 flex justify-between">
                <span className="text-gray-600 font-medium">Amount Paid:</span>
                <span className="font-medium">₹{payment.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Date:</span>
                <span className="font-medium">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
              {payment.razorpayPaymentId && (
                <button 
                  className="btn bg-white border-2 border-green-500 text-green-500 px-6 py-3 rounded-lg font-medium hover:bg-green-500 hover:text-white transition-all duration-300"
                  onClick={() => alert("Downloading receipt...")}
                >
                  Download Receipt
                </button>
              )}

              <Link
                href={`/courses/${courseCode}`}
                className="btn bg-white border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
              >
                Go to Course
              </Link>
            </div>
          </div>
          
          {/* Right Column - Robot Image */}
          <div className="mt-8 md:mt-0 w-full md:w-1/2 flex items-center justify-center">
            <div className="relative h-96 w-full">
              <Image 
                src="/robopayment.png" 
                alt="Robot Payment Success" 
                layout="fill" 
                objectFit="contain" 
                priority
                className="drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional styling for the checkmark animation */}
      <style jsx>{`
        .checkmark-circle {
          width: 150px;
          height: 150px;
          position: relative;
          display: inline-block;
          vertical-align: top;
        }
        .checkmark-circle .background {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: #00C09D;
          position: absolute;
        }
        .checkmark-circle .checkmark {
          border-radius: 5px;
        }
        .checkmark-circle .checkmark.draw:after {
          animation-delay: 100ms;
          animation-duration: 3s;
          animation-timing-function: ease;
          animation-name: checkmark;
          transform: scaleX(-1) rotate(135deg);
          animation-fill-mode: forwards;
        }
        .checkmark-circle .checkmark:after {
          opacity: 1;
          height: 75px;
          width: 37.5px;
          transform-origin: left top;
          border-right: 15px solid white;
          border-top: 15px solid white;
          border-radius: 2.5px !important;
          content: '';
          left: 25px;
          top: 75px;
          position: absolute;
        }
      `}</style>
    </div>
  );
}