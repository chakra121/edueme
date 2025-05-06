"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import * as THREE from 'three';

// Register ScrollTrigger plugin with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Robot Arm Model Component
function RobotArm(props) {
  const { scene } = useGLTF('/mini_robot.glb');
  const modelRef = useRef();
  
  useEffect(() => {
    if (modelRef.current) {
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <primitive 
      ref={modelRef}
      object={scene.clone()} 
      scale={0.5} 
      position={[0, -0.5, 0]} 
      {...props}
    />
  );
}

// Floating Circuit Component
const FloatingCircuit = ({ position, scale, rotation }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        y: position[1] + 0.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(meshRef.current.rotation, {
        z: rotation[2] + Math.PI / 6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color="#ffb800" wireframe={true} />
    </mesh>
  );
};

// Background Circuit Lines Component
const CircuitLines = () => {
  const linesRef = useRef();
  
  useEffect(() => {
    if (linesRef.current) {
      gsap.to(linesRef.current.rotation, {
        z: Math.PI * 2,
        duration: 120,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);
  
  const points = [];
  const size = 10;
  
  // Create grid of points for circuit pattern
  for (let i = -size; i <= size; i += 2) {
    for (let j = -size; j <= size; j += 2) {
      points.push(new THREE.Vector3(i, j, 0));
      if (Math.random() > 0.5) {
        points.push(new THREE.Vector3(i + Math.random(), j + Math.random(), 0));
      }
    }
  }
  
  return (
    <group ref={linesRef}>
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={['attributes', 'position']}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            count={points.length}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#ffb800" opacity={0.3} transparent />
      </line>
    </group>
  );
};

// Doodles Background Component
const DoodlesBackground = () => {
  const doodlesRef = useRef();
  
  useEffect(() => {
    const container = doodlesRef.current;
    if (!container) return;
    
    gsap.to('.doodle-item', {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      rotation: "random(-15, 15)",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });
  }, []);
  
  const doodleItems = [
    { id: 1, size: 50, left: '10%', top: '20%', rotation: 15 },
    { id: 2, size: 30, left: '80%', top: '15%', rotation: -10 },
    { id: 3, size: 40, left: '30%', top: '80%', rotation: 5 },
    { id: 4, size: 60, left: '70%', top: '70%', rotation: -5 },
    { id: 5, size: 25, left: '20%', top: '60%', rotation: 20 },
    { id: 6, size: 35, left: '60%', top: '30%', rotation: -15 }
  ];
  
  return (
    <div ref={doodlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {doodleItems.map(item => (
        <div 
          key={item.id}
          className="doodle-item absolute opacity-20"
          style={{ 
            left: item.left, 
            top: item.top, 
            transform: `rotate(${item.rotation}deg)`,
            width: item.size,
            height: item.size
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ffb800" strokeWidth="2" />
            <path d="M20,50 Q50,20 80,50 T20,50" fill="none" stroke="#ffd166" strokeWidth="2" />
          </svg>
        </div>
      ))}
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, number, label, delay }) => {
  const cardRef = useRef();
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    gsap.fromTo(card, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        delay: delay,
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-xl p-6 flex flex-col items-center transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg border-2 border-amber-100"
    >
      <div className="text-4xl text-amber-500 mb-2">{icon}</div>
      <div className="text-3xl font-bold text-gray-800 mb-1">{number}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};

// Course Module Component
const CourseModule = ({ title, desc, icon, delay }) => {
  const moduleRef = useRef();
  
  useEffect(() => {
    const module = moduleRef.current;
    if (!module) return;
    
    gsap.fromTo(module, 
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.5, 
        delay: delay,
        scrollTrigger: {
          trigger: module,
          start: "top bottom-=50",
          toggleActions: "play none none none" 
        }
      }
    );
  }, []);
  
  return (
    <div 
      ref={moduleRef}
      className="bg-white rounded-xl p-5 transition-all duration-300 hover:transform hover:translate-y-[-5px] hover:shadow-xl border-l-4 border-amber-400"
    >
      <div className="flex items-center mb-3">
        <div className="text-2xl text-amber-500 mr-3">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
};

// Main TeacherHomePage Component
const TeacherHomePage = () => {
  const containerRef = useRef();
  const headingRef = useRef();
  const subtitleRef = useRef();
  
  useEffect(() => {
    // Initialize GSAP animations
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    
    if (heading && subtitle) {
      gsap.fromTo(heading.children, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );
      
      gsap.fromTo(subtitle, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
      );
    }
    
    // Parallax effect on scroll
    if (containerRef.current) {
      const sections = document.querySelectorAll('.parallax-section');
      
      sections.forEach((section, i) => {
        gsap.to(section, {
          y: (i % 2 === 0) ? -30 : -20,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Background effects */}
      <DoodlesBackground />
      
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="sunset" background={false}/>
          
          <CircuitLines />
          
          <FloatingCircuit position={[-3, 1, 0]} scale={[2, 2, 2]} rotation={[0, 0, Math.PI/4]} />
          <FloatingCircuit position={[3, -1, 0]} scale={[1.5, 1.5, 1.5]} rotation={[0, 0, -Math.PI/6]} />
          <FloatingCircuit position={[0, 2, 0]} scale={[1, 1, 1]} rotation={[0, 0, Math.PI/3]} />
          
          <RobotArm position={[4, -1, 0]} scale={0.4} rotation={[0, Math.PI/4, 0]} />
        </Canvas>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-24 mt-12">
          <h1 ref={headingRef} className="text-6xl font-bold mb-6 overflow-hidden">
            <div className="inline-block">Welcome</div>{" "}
            <div className="inline-block">Back,</div>{" "}
            <div className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Teacher!</div>
          </h1>
          <p ref={subtitleRef} className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering the next generation through innovative teaching and technology.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 parallax-section">
          <StatsCard icon="👨‍🎓" number="124" label="Active Students" delay={0.2} />
          <StatsCard icon="📚" number="18" label="Courses Created" delay={0.3} />
          <StatsCard icon="🎯" number="85%" label="Completion Rate" delay={0.4} />
          <StatsCard icon="⭐" number="4.8" label="Average Rating" delay={0.5} />
        </div>
        
        {/* Course Modules */}
        <div className="mb-20 parallax-section">
          <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
            Your Active Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CourseModule 
              title="Robotics Fundamentals" 
              desc="Introduction to robotics principles, mechanisms, and programming basics."
              icon="🤖"
              delay={0.2}
            />
            <CourseModule 
              title="AI for Education" 
              desc="Implementing artificial intelligence tools in modern classroom settings."
              icon="🧠"
              delay={0.3}
            />
            <CourseModule 
              title="Interactive Learning Design" 
              desc="Creating engaging and effective learning experiences with technology."
              icon="💻"
              delay={0.4}
            />
            <CourseModule 
              title="STEM Integration" 
              desc="Cross-disciplinary approaches to science, technology, engineering, and mathematics."
              icon="🔬"
              delay={0.5}
            />
          </div>
        </div>
        
        {/* Quick Actions Card */}
        <div className="card bg-white shadow-xl p-8 border border-amber-200 parallax-section">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button className="btn bg-gradient-to-r from-amber-400 to-amber-500 border-none hover:from-amber-500 hover:to-amber-600 text-white transition-all duration-300">
              Add Class
            </button>
            <button className="btn bg-white border-2 border-amber-400 text-amber-500 hover:bg-amber-50 transition-all duration-300">
              Update Class
            </button>
            <button className="btn bg-gradient-to-r from-amber-400 to-amber-500 border-none hover:from-amber-500 hover:to-amber-600 text-white transition-all duration-300">
              View Analytics
            </button>
            <button className="btn bg-white border-2 border-amber-400 text-amber-500 hover:bg-amber-50 transition-all duration-300">
              Schedule Sessions
            </button>
          </div>
        </div>
      </div>
      
      {/* Geometric shapes floating in background */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-amber-400 rounded-full filter blur-[100px] opacity-10 animate-blob"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-300 rounded-full filter blur-[120px] opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute top-2/3 right-1/3 w-72 h-72 bg-amber-500 rounded-full filter blur-[100px] opacity-10 animate-blob animation-delay-4000"></div>
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default TeacherHomePage;