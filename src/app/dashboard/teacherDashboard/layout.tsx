"use client";
import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import TeacherSideBar from "./sideBar";
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
  
  useEffect(() => {
    // Add hover effect to sidebar
    const sidebarEl = document.querySelector(".sidebar-container");
    if (sidebarEl) {
      sidebarEl.addEventListener("mouseenter", () => {
        gsap.to(sidebarEl, { 
          boxShadow: "0 10px 30px rgba(0, 120, 255, 0.2)",
          duration: 0.4 
        });
      });
      
      sidebarEl.addEventListener("mouseleave", () => {
        gsap.to(sidebarEl, { 
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", 
          duration: 0.4 
        });
      });
    }
    
    // Animate page content on load
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
    
    // Create scroll animations
    if (pageRef.current) {
      // Find all sections with data-animate attribute
      const animatedSections = pageRef.current.querySelectorAll("[data-animate]");
      
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
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }
    
    return () => {
      // Clean up any event listeners
      const sidebar = document.querySelector(".sidebar-container");
      if (sidebar) {
        sidebar.removeEventListener("mouseenter", () => {});
        sidebar.removeEventListener("mouseleave", () => {});
      }
      
      // Kill all GSAP animations to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf("*");
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
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M20,0 L20,100 M0,20 L100,20 M40,0 L40,100 M0,40 L100,40 M60,0 L60,100 M0,60 L100,60 M80,0 L80,100 M0,80 L100,80" 
                  stroke="#4fc3f7" strokeWidth="0.5" fill="none" />
            <circle cx="20" cy="20" r="2" fill="#4fc3f7" />
            <circle cx="60" cy="60" r="2" fill="#4fc3f7" />
            <circle cx="40" cy="80" r="2" fill="#4fc3f7" />
            <circle cx="80" cy="40" r="2" fill="#4fc3f7" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
      
      {/* Moving particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-blue-400 rounded-full opacity-20"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 10 + 10}s linear infinite, 
                         glow ${Math.random() * 5 + 2}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>
      
      {/* Sidebar with modern effect */}
      <div className="sidebar-container card fixed w-64 bg-base-100 bg-opacity-80 backdrop-filter backdrop-blur-lg p-4 z-20 shadow-lg border border-blue-900 border-opacity-30 transition-all duration-300">
        <TeacherSideBar />
      </div>
      
      {/* Main content area */}
      <div
        ref={contentRef}
        className="ml-64 h-[calc(100vh-5rem)] overflow-y-auto px-4 relative z-10"
        style={{ height: 'calc(100dvh - 5rem)' }}
      >
        {children}
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes glow {
          0% { opacity: 0.1; }
          100% { opacity: 0.3; }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(79, 195, 247, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 195, 247, 0.5);
        }
      `}</style>
    </div>
  );
}