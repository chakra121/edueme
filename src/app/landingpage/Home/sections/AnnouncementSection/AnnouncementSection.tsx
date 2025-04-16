"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

export const AnnouncementSection = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    gsap.set(tickerRef.current, { xPercent: 100 });

    gsap.to(tickerRef.current, {
      scrollTrigger: {
        trigger: "#announcement-section",
        start: "top center",
        toggleActions: "play none none reset",
      },
      xPercent: -100,
      duration: 15,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <div id="announcement-section" className="w-full bg-gray-50 py-4 overflow-hidden">
      <div className="flex justify-center mb-3">
        <Badge className="bg-[#ffb800] text-black text-2xl px-5 py-2 rounded-lg">
          📢 Latest Announcements
        </Badge>
      </div>
      <div className="relative w-full h-[50px] overflow-hidden">
        <div
          ref={tickerRef}
          className="absolute whitespace-nowrap text-black text-xl font-semibold"
        >
          🚨 AI Bootcamp starts April 25th • 🎓 Robotics Expo Registrations Open • 🛠️ New STEM Kits Available Now • 🎤 TEDx Talk this Friday at 5 PM • 🚀 Summer Innovation Camp Announced!
        </div>
      </div>
    </div>
  );
};
