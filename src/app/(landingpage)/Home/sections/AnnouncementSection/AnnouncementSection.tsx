"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Announcement = {
  title: string;
  description: string;
};

export const AnnouncementSection = () => {
  const tickerRef = useRef(null);
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch("/api/landing/announcement");
      
        const data = await res.json() as Announcement;
        if (data.title && data.description) {
          setAnnouncement(data);
        }
      } catch (error) {
        console.error("Error fetching announcement:", error);
      }
    };

    void fetchAnnouncement();
  }, []);

  useEffect(() => {
    if (!announcement) return;

    gsap.set(tickerRef.current, { xPercent: 100 });

    gsap.to(tickerRef.current, {
      scrollTrigger: {
        trigger: "#announcement-section",
        start: "top center",
        toggleActions: "restart none restart none",
      },
      xPercent: -100,
      duration: 15,
      ease: "linear",
      repeat: -1,
    });
  }, [announcement]);

  return (
    <div id="announcement-section" className="w-full overflow-hidden py-4">
      <div className="mb-4 flex justify-center">
        <div className="rounded-lg bg-[#ffb800] px-4 py-2 text-2xl leading-tight font-bold text-black">
          🤖 Latest Announcements
        </div>
      </div>
      <div className="relative h-[50px] w-full items-center overflow-hidden bg-gray-50 pt-3">
        <div
          ref={tickerRef}
          className="absolute text-xl font-semibold whitespace-nowrap text-black"
        >
          {announcement ? (
            <>
              <span className="font-bold">📢 {announcement.title}:</span>{" "}
              <span className="font-normal">{announcement.description}</span>
            </>
          ) : (
            "📭 No announcements at the moment."
          )}
        </div>
      </div>
    </div>
  );
};
