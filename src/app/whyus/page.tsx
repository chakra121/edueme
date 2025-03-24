"use client";
import { useState, useEffect } from "react";
import Image from "next/image";


const WhyUs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
   
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
 
  // Calculate position for parallax effect
  const getParallaxStyle = (factor: number) => {
    const x = (mousePosition.x / window.innerWidth - 0.5) * factor;
    const y = (mousePosition.y / window.innerHeight - 0.5) * factor;
    return { transform: `translate(${x}px, ${y}px)` };
  };


  return (
    <div className="relative overflow-hidden pt-[7rem] text-white bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Background Doodles with Mouse Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Circuit Board SVG - Top Right */}
        <div
          className="absolute top-10 right-10 w-64 h-64 opacity-20"
          style={getParallaxStyle(-20)}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#4F8BFF">
            <path d="M20,20 L180,20 L180,180 L20,180 Z" strokeWidth="2" />
            <circle cx="50" cy="50" r="10" />
            <circle cx="150" cy="50" r="10" />
            <circle cx="50" cy="150" r="10" />
            <circle cx="150" cy="150" r="10" />
            <path d="M50,50 L50,100 L100,100" strokeWidth="2" />
            <path d="M150,50 L150,100 L100,100" strokeWidth="2" />
            <path d="M50,150 L50,120 L80,120" strokeWidth="2" />
            <path d="M150,150 L150,120 L120,120" strokeWidth="2" />
            <path d="M100,100 L100,180" strokeWidth="2" />
          </svg>
        </div>
       
        {/* Rotating Gear - Bottom Left */}
        <div
          className="absolute bottom-20 left-20 w-48 h-48 opacity-15"
          style={{
            ...getParallaxStyle(15),
            transform: `translate(${(mousePosition.x / window.innerWidth - 0.5) * 15}px, ${(mousePosition.y / window.innerHeight - 0.5) * 15}px) rotate(${mousePosition.x * 0.02}deg)`
          }}
        >
          <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="#3498db">
            <path d="M60,25 L65,10 L55,10 Z" />
            <path d="M60,95 L65,110 L55,110 Z" />
            <path d="M25,60 L10,65 L10,55 Z" />
            <path d="M95,60 L110,65 L110,55 Z" />
            <path d="M35,35 L25,25 L20,30 Z" />
            <path d="M85,85 L95,95 L90,100 Z" />
            <path d="M35,85 L25,95 L30,100 Z" />
            <path d="M85,35 L95,25 L90,20 Z" />
            <circle cx="60" cy="60" r="30" fill="#2980b9" />
            <circle cx="60" cy="60" r="15" fill="#1a5276" />
          </svg>
        </div>
       
        {/* Robot Arm - Middle Left */}
        <div
          className="absolute top-1/3 left-5 w-32 h-64 opacity-20"
          style={getParallaxStyle(10)}
        >
          <svg viewBox="0 0 100 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#64B5F6">
            <rect x="40" y="10" width="20" height="30" rx="2" strokeWidth="2" />
            <rect x="30" y="40" width="40" height="20" rx="2" strokeWidth="2" />
            <path d="M50,60 L50,100" strokeWidth="3" />
            <rect x="30" y="100" width="40" height="25" rx="2" strokeWidth="2" />
            <path d="M50,125 L50,150" strokeWidth="3" />
            <path d="M50,150 L30,180" strokeWidth="3" />
            <path d="M50,150 L70,180" strokeWidth="3" />
            <circle cx="30" cy="180" r="5" fill="#64B5F6" />
            <circle cx="70" cy="180" r="5" fill="#64B5F6" />
          </svg>
        </div>
       
        {/* Binary Code Pattern - Right */}
        <div
          className="absolute top-1/2 right-10 w-96 h-96 opacity-10"
          style={getParallaxStyle(-15)}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="#9CCC65">
            <text x="10" y="20" fontSize="10">01001010</text>
            <text x="30" y="40" fontSize="10">10110101</text>
            <text x="15" y="60" fontSize="10">11100110</text>
            <text x="40" y="80" fontSize="10">01011010</text>
            <text x="20" y="100" fontSize="10">10101010</text>
            <text x="50" y="120" fontSize="10">01101001</text>
            <text x="10" y="140" fontSize="10">11001010</text>
            <text x="30" y="160" fontSize="10">10011011</text>
            <text x="60" y="180" fontSize="10">01010101</text>
            <text x="90" y="30" fontSize="10">10011011</text>
            <text x="120" y="50" fontSize="10">01101001</text>
            <text x="80" y="70" fontSize="10">11001100</text>
            <text x="110" y="90" fontSize="10">10101010</text>
            <text x="140" y="110" fontSize="10">00110011</text>
            <text x="100" y="130" fontSize="10">11010010</text>
            <text x="130" y="150" fontSize="10">01011010</text>
            <text x="90" y="170" fontSize="10">10110101</text>
            <text x="120" y="190" fontSize="10">01001100</text>
          </svg>
        </div>
       
        {/* Animated Mini Drone */}
        <div
          className="absolute top-1/4 right-1/3 w-16 h-16 opacity-25 animate-bounce"
          style={{
            animation: "float 8s infinite ease-in-out",
          }}
        >
          <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="#FF5722">
            <circle cx="25" cy="25" r="10" />
            <rect x="23" y="10" width="4" height="5" />
            <rect x="23" y="35" width="4" height="5" />
            <rect x="10" y="23" width="5" height="4" />
            <rect x="35" y="23" width="5" height="4" />
            <circle cx="10" cy="10" r="5" />
            <circle cx="40" cy="10" r="5" />
            <circle cx="10" cy="40" r="5" />
            <circle cx="40" cy="40" r="5" />
          </svg>
        </div>
      </div>


      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center opacity-0 animate-fadeIn" style={{animation: "fadeIn 0.8s forwards"}}>
          <h1 className="text-5xl md:text-6xl font-bold text-center leading-tight bg-gradient-to-r from-blue-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent">
            Why Choose Us?
          </h1>
          <div className="h-1 bg-yellow-400 mt-4 mb-6 rounded-full w-0 animate-expandWidth" style={{animation: "expandWidth 1s 0.6s forwards"}}></div>
          <p className="mt-4 text-lg md:text-xl text-center text-gray-300 max-w-2xl opacity-0 animate-fadeIn" style={{animation: "fadeIn 1s 0.8s forwards"}}>
            We inspire young minds with hands-on robotics education, blending interactive learning with real-world applications. Join us in shaping the future of technology.
          </p>
        </div>
       
        <div className="mt-20 flex flex-col lg:flex-row items-center justify-center gap-12 opacity-0 animate-fadeIn" style={{animation: "fadeIn 1s 1s forwards"}}>
          {/* GIF Section with floating effect */}
          <div className="relative w-full md:w-[400px] h-[400px] rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 hover:scale-105 transition-transform duration-300 animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 mix-blend-overlay"></div>
            <Image src="/info1.gif" alt="Information" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <span className="text-lg font-bold bg-black/50 px-4 py-2 rounded-full">Interactive Learning</span>
            </div>
           
            {/* Small circuit doodle on top */}
            <div className="absolute top-4 right-4 w-12 h-12 opacity-70">
              <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ffffff">
                <circle cx="25" cy="25" r="10" strokeWidth="1" />
                <path d="M25,15 L25,5" strokeWidth="1" />
                <path d="M25,35 L25,45" strokeWidth="1" />
                <path d="M15,25 L5,25" strokeWidth="1" />
                <path d="M35,25 L45,25" strokeWidth="1" />
                <circle cx="25" cy="5" r="2" fill="#ffffff" />
                <circle cx="25" cy="45" r="2" fill="#ffffff" />
                <circle cx="5" cy="25" r="2" fill="#ffffff" />
                <circle cx="45" cy="25" r="2" fill="#ffffff" />
              </svg>
            </div>
          </div>
         
          {/* Information Section with animated items */}
          <div className="max-w-xl w-full">
            <ul className="space-y-8">
              {[
                { icon: "📘", color: "yellow-400", text: "Hands-on Learning with Real Robotics Kits", delay: 0.2 },
                { icon: "🤖", color: "blue-400", text: "AI & Automation Integrated Curriculum", delay: 0.4 },
                { icon: "🚀", color: "green-400", text: "Industry Expert Mentorship & Guidance", delay: 0.6 },
                { icon: "🎓", color: "red-400", text: "Certifications & Future Career Support", delay: 0.8 }
              ].map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 hover:from-gray-800/80 hover:to-gray-900/80 backdrop-blur-sm transition-all duration-300 shadow-lg group opacity-0 animate-slideIn hover:scale-102 hover:translate-x-1`}
                  style={{animation: `slideIn 0.6s ${1.2 + item.delay}s forwards`}}
                >
                  <div className={`text-${item.color} text-3xl bg-gray-800 p-3 rounded-full flex items-center justify-center min-w-14 h-14 shadow-inner shadow-black/50 group-hover:rotate-12 transition-transform duration-300`}>
                    <span>{item.icon}</span>
                  </div>
                  <span className="text-lg md:text-xl font-medium group-hover:text-white transition-colors duration-300">{item.text}</span>
                 
                  {/* Small doodle next to each item */}
                  <div className="ml-auto w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    {index === 0 && (
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FFD54F">
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M8,8 L16,8" stroke="#222" strokeWidth="1" />
                        <path d="M8,12 L16,12" stroke="#222" strokeWidth="1" />
                        <path d="M8,16 L12,16" stroke="#222" strokeWidth="1" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#64B5F6">
                        <circle cx="12" cy="12" r="6" />
                        <circle cx="10" cy="10" r="1" fill="#222" />
                        <circle cx="14" cy="10" r="1" fill="#222" />
                        <path d="M9,14 Q12,16 15,14" fill="none" stroke="#222" strokeWidth="1" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#81C784">
                        <path d="M12,4 L8,12 L12,12 L12,20 L16,12 L12,12 Z" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#E57373">
                        <path d="M12,4 L18,10 L14,10 L14,14 L18,14 L12,20 L6,14 L10,14 L10,10 L6,10 Z" />
                      </svg>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
       
        {/* National Education Policy Section */}
        <div className="mt-24 px-6 max-w-4xl mx-auto text-center relative opacity-0 animate-fadeInUp" style={{animation: "fadeInUp 0.8s forwards"}}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 rounded-3xl transform -skew-y-2 scale-105 blur-xl"></div>
         
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300 relative">
            National Education Policy (NEP)
          </h2>
         
          <div className="h-1 bg-yellow-400 mt-4 mx-auto rounded-full w-0 animate-expandWidth" style={{animation: "expandWidth 1s 0.3s forwards"}}></div>
         
          <p className="mt-6 text-lg text-gray-300 relative">
            The National Education Policy (NEP) aims to transform the educational landscape by promoting holistic and multidisciplinary learning. It emphasizes flexibility in curriculum, integration of vocational education, and the use of technology to enhance learning outcomes.
          </p>
         
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {[
              { title: "Flexible Curriculum", desc: "NEP introduces a multidisciplinary approach, allowing students to choose subjects across streams.", delay: 0.2 },
              { title: "Skill Development", desc: "It integrates vocational education and real-world skills to make students industry-ready.", delay: 0.4 },
              { title: "Technology in Education", desc: "Encourages digital learning and modern teaching techniques to enhance educational outcomes.", delay: 0.6 },
              { title: "Inclusive Education", desc: "Focuses on equitable access to quality education for all, including disadvantaged groups.", delay: 0.8 }
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/50 backdrop-blur-sm shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group opacity-0 hover:scale-105"
                style={{animation: `fadeIn 0.5s ${item.delay}s forwards`}}
              >
                <div className="relative">
                  <h3 className="text-xl font-semibold text-white group-hover:text-yellow-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-blue-400 my-3 group-hover:w-20 transition-all duration-300"></div>
                  <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300">{item.desc}</p>
                </div>
               
                {/* Corner Doodle for each card */}
                <div className="absolute bottom-2 right-2 w-12 h-12 opacity-20 group-hover:opacity-70 transition-opacity duration-300 animate-spin" style={{animation: "spin 20s linear infinite"}}>
                  {index === 0 && (
                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="#64B5F6">
                      <path d="M20,5 L25,15 L35,20 L25,25 L20,35 L15,25 L5,20 L15,15 Z" />
                      <circle cx="20" cy="20" r="5" fill="#1E88E5" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="#81C784">
                      <circle cx="20" cy="20" r="15" fill="none" stroke="#81C784" strokeWidth="2" />
                      <circle cx="20" cy="20" r="10" fill="none" stroke="#81C784" strokeWidth="2" />
                      <circle cx="20" cy="20" r="5" fill="#81C784" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="#FFD54F">
                      <rect x="5" y="5" width="30" height="30" fill="none" stroke="#FFD54F" strokeWidth="2" />
                      <path d="M10,15 L15,10 L25,20 L15,30 L10,25 Z" />
                      <path d="M25,10 L30,15 L20,25 L30,25 L25,30 Z" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="#E57373">
                      <circle cx="20" cy="20" r="15" fill="none" stroke="#E57373" strokeWidth="2" />
                      <path d="M15,15 L25,25" stroke="#E57373" strokeWidth="2" />
                      <path d="M15,25 L25,15" stroke="#E57373" strokeWidth="2" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
       
        {/* Call to Action */}
        <div className="mt-20 text-center opacity-0 animate-fadeIn" style={{animation: "fadeIn 0.6s 0.3s forwards"}}>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h3>
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full text-lg font-medium shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 active:scale-98">
            Enroll Now
          </button>
        </div>
       
        {/* Extra floating doodles at the bottom */}
        <div className="relative h-48 mt-12">
          {/* Floating Brain Doodle */}
          <div
            className="absolute left-1/4 top-1/2 w-16 h-16 opacity-30 hover:opacity-70 transition-opacity duration-300"
            style={{
              ...getParallaxStyle(25),
              animation: "float 3s infinite ease-in-out",
            }}
          >
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="#BA68C8">
              <path d="M25,10 C40,10 40,40 25,40 C10,40 10,10 25,10 Z" />
              <path d="M20,20 Q25,15 30,20" fill="none" stroke="#4A148C" strokeWidth="1" />
              <path d="M15,25 Q25,30 35,25" fill="none" stroke="#4A148C" strokeWidth="1" />
              <path d="M20,30 Q25,35 30,30" fill="none" stroke="#4A148C" strokeWidth="1" />
            </svg>
          </div>
         
          {/* Floating Microchip Doodle */}
          <div
            className="absolute right-1/4 top-1/3 w-14 h-14 opacity-40 hover:opacity-80 transition-opacity duration-300"
            style={{
              ...getParallaxStyle(-20),
              animation: "floatReverse 4s infinite ease-in-out",
            }}
          >
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="#4FC3F7">
              <rect x="10" y="10" width="30" height="30" rx="2" />
              <rect x="15" y="15" width="20" height="20" rx="1" fill="#0277BD" />
              <path d="M5,20 L10,20" stroke="#4FC3F7" strokeWidth="2" />
              <path d="M5,30 L10,30" stroke="#4FC3F7" strokeWidth="2" />
              <path d="M40,20 L45,20" stroke="#4FC3F7" strokeWidth="2" />
              <path d="M40,30 L45,30" stroke="#4FC3F7" strokeWidth="2" />
              <path d="M20,5 L20,10" stroke="#4FC3F7" strokeWidth="2" />
              <path d="M30,5 L30,10" stroke="#4FC3F7" strokeWidth="2" />
              <path d="M20,40 L20,45" stroke="#4FC3F7" strokeWidth="2" />
              <path d="M30,40 L30,45" stroke="#4FC3F7" strokeWidth="2" />
            </svg>
          </div>
         
          {/* Floating Atom Doodle */}
          <div
            className="absolute left-1/3 bottom-1/4 w-12 h-12 opacity-35 hover:opacity-75 transition-opacity duration-300"
            style={{
              ...getParallaxStyle(15),
              animation: "spin 8s linear infinite",
            }}
          >
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#FF9800">
              <circle cx="25" cy="25" r="5" fill="#FF9800" />
              <ellipse cx="25" cy="25" rx="20" ry="10" transform="rotate(0)" strokeWidth="1" />
              <ellipse cx="25" cy="25" rx="20" ry="10" transform="rotate(60)" strokeWidth="1" />
              <ellipse cx="25" cy="25" rx="20" ry="10" transform="rotate(120)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
      
     
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 120px; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};


export default WhyUs;

