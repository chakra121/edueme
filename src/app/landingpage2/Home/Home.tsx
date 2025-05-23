"use client";
import React, { useEffect, useRef, useState } from "react";
import { CallToActionSection } from "./sections/CallToActionSection";
import { CaseStudiesSection } from "./sections/CaseStudiesSection/CaseStudiesSection";
import Image from "next/image";
import { ContactLinks } from "./sections/ContactLinks/ContactLinks";
import { FeaturesSection } from "./sections/FeaturesSection/FeaturesSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { ProcessOverviewSection } from "./sections/ProcessOverviewSection";
import { ServicesSection } from "./sections/ServicesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { SkillEducationSection } from "./sections/SkillEducationSection/SkillEducationSection";
import { CreatingInnovatorsSection } from "./sections/CreatingInnovatorsSection/CreatingInnovatorsSection";
import { AcademicYearSection } from "./sections/AcademicYearSection/AcademicYearSection";
import { UpcomingEventsSection } from "./sections/UpcomingEventsSection/UpcomingEventsSection";
import { AnnouncementSection } from "./sections/AnnouncementSection/AnnouncementSection";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const sectionHeaders = [
  {
    id: "services",
    badge: "Services",
    description:
      "Edueme provides educators and students with the tools to cultivate coding and problem-solving skills, enabling them to engineer their future.",
  },
  {
    id: "mission",
    badge: "Mission of Curriculum",
    description:
      "Our mission is to design a dynamic and inclusive curriculum that fosters critical thinking, innovation, and lifelong learning.",
  },
  {
    id: "curriculum",
    badge: "Curriculum Highlights",
    description:
      "Our curriculum is designed to provide an immersive and hands-on STEM learning experience, fostering creativity, critical thinking, and problem-solving skills.",
  },
  {
    id: "training",
    badge: "Inclassroom Training",
    description:
      "Meet the skilled and experienced team behind our successful digital marketing strategies.",
  },
  {
    id: "testimonials",
    badge: "Listen to our Clients",
    description:
      "Hear from Our Satisfied Learners: Read our testimonials to learn more about our transformative education programs.",
  },
  {
    id: "contact",
    badge: "Contact Us",
    description: "Connect with Us: Let's Shape Your Future.",
  },
];

const Home = (): JSX.Element => {
  const robotRef = useRef(null);
  const containerRef = useRef(null);
  const [isRobotVisible, setIsRobotVisible] = useState(true);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial robot position (top center of the viewport)
    gsap.set(robotRef.current, {
      position: "fixed",
      top: "80px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "120px",
      height: "auto",
      zIndex: 1000,
      opacity: 0
    });

    // Fade in animation for robot
    gsap.to(robotRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.5
    });

    // Create a smooth path for the robot
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smoother scrubbing with a 1 second delay
        onUpdate: (self) => {
          // Show/hide robot based on scroll position
          if (self.progress > 0.05 && self.progress < 0.95) {
            setIsRobotVisible(true);
          } else {
            setIsRobotVisible(false);
          }
        }
      }
    });

    // Position waypoints for a smoother path
    const waypoints = [
      { top: "120px", left: "30%", rotate: 0, scale: 1 },
      { top: "150px", left: "70%", rotate: "10deg", scale: 1.1 },
      { top: "180px", left: "20%", rotate: "-5deg", scale: 0.9 },
      { top: "150px", left: "80%", rotate: "15deg", scale: 1.2 },
      { top: "200px", left: "25%", rotate: "-10deg", scale: 1 },
      { top: "160px", left: "65%", rotate: "5deg", scale: 1.1 },
      { top: "220px", left: "40%", rotate: "-15deg", scale: 0.95 },
      { top: "180px", left: "60%", rotate: "0deg", scale: 1 }
    ];
    
    // Add each waypoint to the timeline
    waypoints.forEach((point, index) => {
      mainTimeline.to(robotRef.current, {
        top: point.top,
        left: point.left,
        rotate: point.rotate,
        scale: point.scale,
        ease: "power1.inOut", // Smoother easing
        duration: 1 / waypoints.length // Distribute evenly across the timeline
      }, index / waypoints.length);
    });

    // Add hover animation for the robot
    const hoverAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    hoverAnimation.to(robotRef.current, {
      y: "-=10",
      duration: 1,
      ease: "power1.inOut"
    });

    // Add button to toggle robot visibility
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '🤖';
    toggleButton.style.position = 'fixed';
    toggleButton.style.bottom = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.zIndex = '1001';
    toggleButton.style.backgroundColor = '#ffb800';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '50%';
    toggleButton.style.width = '50px';
    toggleButton.style.height = '50px';
    toggleButton.style.fontSize = '24px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    
    document.body.appendChild(toggleButton);
    
    let isRobotHidden = false;
    toggleButton.addEventListener('click', () => {
      isRobotHidden = !isRobotHidden;
      gsap.to(robotRef.current, {
        opacity: isRobotHidden ? 0 : 1,
        duration: 0.3
      });
    });

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      hoverAnimation.kill();
      if (document.body.contains(toggleButton)) {
        document.body.removeChild(toggleButton);
      }
    };
  }, []);

  return (
    <div className="bg-white flex flex-row justify-center w-full" ref={containerRef}>
      {/* Robot Element that will be animated */}
      <Image
        width={120}
        height={120} 
        ref={robotRef}
        src="/robo.gif" 
        alt="Robot Animation" 
        className={`hidden md:block transition-opacity duration-300 ${isRobotVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
      />

      <div className="bg-white w-full max-w-[1688px] relative">
        <div className="relative w-full">
          <HeroSection />
          <Image
            height={20}
            width={488}
            className="absolute w-[488px] h-20 top-0 left-[39px] object-cover"
            alt="Image"
            src="/image-12.png"
          />
        </div>

        <div id="case-studies-section" className="w-full">
          <AnnouncementSection />
        </div>


        {/* Skill Education Section */}
        <div id="case-studies-section" className="w-full">
          <SkillEducationSection />
        </div>

        {/* Creating Innovators Section */}
        <div id="case-studies-section" className="w-full">
          <CreatingInnovatorsSection />
        </div>

        {/* Academic Year Section */}
        <div id="case-studies-section" className="w-full">
          <AcademicYearSection />
        </div>

        <div id="services-section" className="w-full mt-16">
          <div className="flex w-full max-w-[1440px] items-start gap-10 px-[100px] py-0 mx-auto">
            <div className="flex flex-col items-start">
            <div className="px-4 py-2 bg-[#ffb800] text-black rounded-lg font-bold text-4xl leading-tight">
              Services
            </div>
            </div>
            <div className="font-p text-black text-lg leading-relaxed w-[580px]">
              {sectionHeaders?.[0]?.description}
            </div>
          </div>
          <ServicesSection />
        </div>

        <div id="cta-section" className="w-full relative">
          <CallToActionSection />
  
        </div>

        <div id="case-studies-section" className="w-full">
          <CaseStudiesSection />
        </div>

        <div id="case-studies-section" className="w-full">
          <UpcomingEventsSection />
        </div>

        <div id="process-section" className="w-full">
          <ProcessOverviewSection />
        </div>

        {/* Inclassroom Training Section */}
        <div id="training-section" className="w-full mt-16">
          <div className="flex w-full max-w-[1440px] items-start gap-10 px-[100px] py-0 mx-auto">
            <div className="flex flex-col items-start">
            <div className="px-4 py-2 bg-[#ffb800] text-black rounded-lg font-bold text-4xl leading-tight">
              Inclassroom Training
            </div>
            </div>
            <div className="font-p text-black text-lg leading-relaxed w-[580px]">
              {sectionHeaders?.[3]?.description}
            </div>
          </div>
        </div>

        <div id="features-section" className="w-full relative">
          <FeaturesSection />
        </div>

        <div id="testimonials-section" className="w-full mt-16">
          <div className="flex w-full max-w-[1440px] items-start gap-10 px-[100px] py-0 mx-auto">
            <div className="flex flex-col items-start">
            <div className="px-4 py-2 bg-[#ffb800] text-black rounded-lg font-bold text-4xl leading-tight">
              Listen to our Clients
            </div>
            </div>
            <div className="font-p text-black text-lg leading-relaxed w-[576px]">
              {sectionHeaders?.[4]?.description}
            </div>
          </div>
          <TestimonialsSection />
        </div>

        <div id="contact-section" className="w-full mt-16">
        
          <ContactLinks />
        </div>
      </div>
    </div>
  );
};

export default Home;