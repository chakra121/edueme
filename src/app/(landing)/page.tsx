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
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "OlS4o96Fwm8y-BCqebNv0";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
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
