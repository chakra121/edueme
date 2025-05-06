/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, type ReactNode } from "react";
import StudentSideBar from "./sideBar"; // Assuming this path is correct
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger plugin if in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: PageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    const sidebarEl = document.querySelector(".sidebar-container");
    if (sidebarEl) {
      const enterAnimation = gsap.to(sidebarEl, {
        boxShadow: "0 10px 30px rgba(79, 195, 247, 0.25)", // Adjusted color for blue theme
        duration: 0.4,
        paused: true,
      });
      enterAnimation.play();
    }
  };

  const onMouseLeave = () => {
    const sidebarEl = document.querySelector(".sidebar-container");
    if (sidebarEl) {
      const leaveAnimation = gsap.to(sidebarEl, {
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        duration: 0.4,
        paused: true,
      });
      leaveAnimation.play();
    }
  };

  useEffect(() => {
    // Add hover effect to sidebar
    const sidebarEl = document.querySelector(".sidebar-container"); // Ensure your sidebar div has this class
    if (sidebarEl) {
      sidebarEl.addEventListener("mouseenter", onMouseEnter);
      sidebarEl.addEventListener("mouseleave", onMouseLeave);

      // Initial shadow
      gsap.set(sidebarEl, { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" });
    }

    // Animate page content on load
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 } // Added a small delay
      );
    }

    // Create scroll animations for elements with data-animate
    if (pageRef.current) {
      const animatedSections = Array.from(pageRef.current.querySelectorAll("[data-animate]"));
      
      animatedSections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: section,
              start: "top bottom-=100", // Start animation when 100px from bottom of viewport
              toggleActions: "play none none none", // Play once when it enters
            },
          }
        );
      });
    }

    return () => {
      // Clean up GSAP animations and event listeners
      if (sidebarEl) {
        const sidebar = document.querySelector(".sidebar-container");
        if (sidebar) {
          sidebar.removeEventListener("mouseenter", onMouseEnter); // Use the exact function reference
          sidebar.removeEventListener("mouseleave", onMouseLeave); // Use the exact function reference
        }
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf([".sidebar-container", contentRef.current]); // Kill specific tweens
      if (pageRef.current) {
        const animatedSections = Array.from(pageRef.current.querySelectorAll("[data-animate]"));
        gsap.killTweensOf(animatedSections);
      }
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-b from-blue-950 to-black px-[4rem] pt-[5rem] relative overflow-hidden"
    >
      {/* Circuit pattern background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuitPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M20,0 L20,100 M0,20 L100,20 M40,0 L40,100 M0,40 L100,40 M60,0 L60,100 M0,60 L100,60 M80,0 L80,100 M0,80 L100,80" 
                  stroke="#4fc3f7" strokeWidth="0.3" fill="none" /> {/* Slightly thinner lines */}
            <circle cx="20" cy="20" r="1.5" fill="#4fc3f7" /> {/* Smaller dots */}
            <circle cx="60" cy="60" r="1.5" fill="#4fc3f7" />
            <circle cx="40" cy="80" r="1.5" fill="#4fc3f7" />
            <circle cx="80" cy="40" r="1.5" fill="#4fc3f7" />
            <circle cx="10" cy="50" r="1" fill="#4fc3f7" opacity="0.7" />
            <circle cx="50" cy="10" r="1" fill="#4fc3f7" opacity="0.7" />
            <circle cx="90" cy="70" r="1" fill="#4fc3f7" opacity="0.7" />
            <circle cx="70" cy="90" r="1" fill="#4fc3f7" opacity="0.7" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
      </div>
      
      {/* Moving particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => ( // Increased particle count slightly
          <div 
            key={i}
            className="absolute bg-blue-400 rounded-full" // Removed opacity-20, will be handled by glow animation
            style={{
              width: `${Math.random() * 4 + 1.5}px`, // Adjusted size
              height: `${Math.random() * 4 + 1.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 15 + 10}s linear infinite, 
                         glowParticle ${Math.random() * 6 + 3}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Sidebar with modern effect */}
      {/* Added sidebar-container class here */}
      <div className="sidebar-container card fixed w-64 bg-base-100 bg-opacity-70 backdrop-filter backdrop-blur-md p-4 z-20 shadow-lg border border-blue-800 border-opacity-40 transition-all duration-300">
        <StudentSideBar />
      </div>
      
      {/* Main content area */}
      <div
        ref={contentRef}
        className="ml-64 px-4 relative z-10 h-[calc(100vh-5rem)] overflow-y-auto" // DaisyUI 'h-screen' might be more idiomatic if full height is always desired.
                                                                               // However, calc(100vh - 5rem) accounts for the top padding.
        style={{ height: 'calc(100dvh - 5rem)' }} // Using dvh for better mobile viewport handling
      >
        {children}
      </div>
      
      <style jsx global>{`
        @keyframes floatParticle { /* Renamed to avoid conflicts if other float keyframes exist */
          0% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(10px) scale(1.05); }
          50% { transform: translateY(0px) translateX(20px) scale(1); }
          75% { transform: translateY(15px) translateX(10px) scale(0.95); }
          100% { transform: translateY(0px) translateX(0px) scale(1); }
        }
        
        @keyframes glowParticle { /* Renamed */
          0% { opacity: 0.05; box-shadow: 0 0 3px 1px rgba(79, 195, 247, 0.2); }
          100% { opacity: 0.25; box-shadow: 0 0 8px 2px rgba(79, 195, 247, 0.4); }
        }
        
        /* Custom scrollbar for WebKit browsers */
        .ml-64::-webkit-scrollbar { /* Target the scrollable container */
          width: 8px;
        }
        
        .ml-64::-webkit-scrollbar-track {
          background: transparent; /* Or a very subtle color like rgba(0,0,0,0.1) */
        }
        
        .ml-64::-webkit-scrollbar-thumb {
          background: rgba(79, 195, 247, 0.3); /* Light blue, semi-transparent */
          border-radius: 10px;
          border: 1px solid rgba(79, 195, 247, 0.1); /* Subtle border */
        }
        
        .ml-64::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 195, 247, 0.5);
        }

        /* Firefox scrollbar styling (optional, less customizable) */
        .ml-64 {
          scrollbar-width: thin;
          scrollbar-color: rgba(79, 195, 247, 0.3) transparent;
        }
      `}</style>
    </div>
  );
}