"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
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
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down"); // User scrolling down
      } else {
        setScrollDirection("up"); // User scrolling up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Motion variants for animation
  const getVariants = () => ({
    hidden: { opacity: 0, y: scrollDirection === "down" ? 80 : -80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  });

  // Add the chatbot integration script
  useEffect(() => {
    const scriptId = "OlS4o96Fwm8y-BCqebNv0";
    const existingScript = document.getElementById(scriptId);
    
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = scriptId;
      script.domain = "www.chatbase.co";
      document.body.appendChild(script);
    }

    // Cleanup script on component unmount
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        document.body.removeChild(scriptToRemove);
      }
    };
  }, []);

  // Hash generation for user identification
  const generateUserHash = (userId) => {
    const crypto = require('crypto');
    const secret = 'xl0bdm7lsnlby75bm6nt5nxxk2e11k45'; // Your verification secret key
    return crypto.createHmac('sha256', secret).update(userId).digest('hex');
  };

  // Assuming you have a way to get the current user's ID
  const userId = data?.user?.id; // Adjust this based on your user data structure
  const userHash = userId ? generateUserHash(userId) : null;

  // Log user hash for debugging
  console.log("User Hash:", userHash);

  // Custom Cursor Functionality
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [outerCursorPosition, setOuterCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition((prev) => {
        const newPosition = { x: event.clientX, y: event.clientY };
        if (Math.abs(newPosition.x - prev.x) > 5 || Math.abs(newPosition.y - prev.y) > 5) {
          return newPosition;
        }
        return prev;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animateCursor = () => {
      setCursorPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.35,
        y: prev.y + (mousePosition.y - prev.y) * 0.35,
      }));

      setOuterCursorPosition((prev) => ({
        x: prev.x + (cursorPosition.x - prev.x) * 0.45,
        y: prev.y + (cursorPosition.y - prev.y) * 0.45,
      }));

      requestAnimationFrame(animateCursor);
    };

    animateCursor();
  }, [mousePosition, cursorPosition]);

  return (
    <div className="bg-base-200">
      {/* Custom Cursor */}
      <>
        <div
          style={{
            position: "fixed",
            top: cursorPosition.y,
            left: cursorPosition.x,
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "brown",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            transition: "background-color 0.2s ease, transform 0.2s ease",
            zIndex: 1001,
          }}
        />
        <div
          style={{
            position: "fixed",
            top: outerCursorPosition.y,
            left: outerCursorPosition.x,
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "2px solid orange",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            transition: "background-color 0.2s ease, transform 0.2s ease",
            zIndex: 1000,
          }}
        />
      </>
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

      {/* Chatbot Integration */}
      {userHash && (
        <script>
          {`(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="OlS4o96Fwm8y-BCqebNv0";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`}
        </script>
      )}

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


