"use client";

import React, { useEffect, useState } from "react";
import { FaChalkboardTeacher, FaUsers, FaLaptopCode, FaCertificate } from "react-icons/fa";

const ICLearning = () => {
  const [theme, setTheme] = useState("bumblebee");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "bumblebee";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const points = [
    { 
      title: "Interactive Learning", 
      description: "Engage with instructors in real-time, ask questions, and participate in discussions for a better understanding.",
      icon: <FaChalkboardTeacher className="text-5xl text-primary" />,
      image: "interactive_learning.jpg"
    },
    { 
      title: "Collaborative Environment", 
      description: "Work together with peers, share ideas, and improve teamwork skills through group activities and projects.",
      icon: <FaUsers className="text-5xl text-secondary" />,  
      image: "collaborative_learning.jpg"
    },
    { 
      title: "Hands-On Practical Sessions", 
      description: "Gain real-world experience with lab exercises, coding sessions, and live demonstrations.",
      icon: <FaLaptopCode className="text-5xl text-accent" />,
      image: "hands_on_learning.jpg"
    },
    { 
      title: "Certified Courses", 
      description: "Complete instructor-led courses and earn industry-recognized certifications to boost your career.",
      icon: <FaCertificate className="text-5xl text-warning" />,
      image: "certification.jpg"
    }
  ];

  return (
    <section className="flex flex-col items-center justify-center py-16 transition-all duration-500 bg-base-100 text-base-content">
      <h2 className="text-4xl font-bold text-center mb-10">In-Classroom Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {points.map((point, index) => (
          <div 
            key={index} 
            className="card bg-base-200 shadow-xl hover:scale-105 hover:shadow-lg transition-transform duration-300 overflow-hidden h-[450px]"
          >
            <figure className="h-1/2 w-full">
              <img src={point.image} alt={point.title} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body h-1/2 flex flex-col justify-center">
              <div className="flex items-center gap-4">
                {point.icon}
                <h3 className="text-2xl font-semibold">{point.title}</h3>
              </div>
              <p className="mt-2 text-lg text-base-content">{point.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ICLearning;
