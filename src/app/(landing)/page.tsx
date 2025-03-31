"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Hero from "./Hero";
import Schools from "./Schools";
import Products from "./Products";
import Services from "./Services";
import Gallery from "./Gallery";
import AnnouncementScroller from "./AnnouncementScroller";
import MOFC from "./Mofc";
import CH from "./curriculumh";
import ICT from "./Ictraining";
import Reviews from "./reviews";
import { useSession, signOut } from "next-auth/react";

export default function HomePage() {
  const announcements = [
    "Welcome to Edueme!, Enhance your future with Robust Education",
  ];

  const logouthandler = async () => {
    await signOut();
  };

  const { data } = useSession();

  // State to track scroll direction
  const [scrollDirection, setScrollDirection] = useState("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down"); // User scrolling down
      } else {
        setScrollDirection("up"); // User scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Motion variants for animation
  const getVariants = () => ({
    hidden: { opacity: 0, y: scrollDirection === "down" ? 80 : -80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  });


  return (
    <div className="bg-base-200">
      {/* Hero Section */}
      <Hero />

      {/* Announcement Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        variants={getVariants()}
      >
        {JSON.stringify(data)}
        <button onClick={logouthandler}> Logout</button>
        <AnnouncementScroller announcements={announcements} />
      </motion.div>

      {/* Sections with Bidirectional Scroll Animation */}
      {[Schools, Services, Products, MOFC, CH, ICT, Reviews, Gallery].map(
        (Component, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={getVariants()}
          >
            <Component />
          </motion.div>
        ),
      )}
    </div>
  );
}


