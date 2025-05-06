"use client";
import React, { useEffect, useRef} from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type * as THREE from 'three';
import { Vector3 } from 'three';

// Register ScrollTrigger plugin with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


// Floating Circuit Component
const FloatingCircuit = ({ position, scale, rotation }: { position: [number, number, number]; scale: [number, number, number]; rotation: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (meshRef.current) {
      if (meshRef.current) {
        gsap.to(meshRef.current.position, {
          y: position[1] + 0.2,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
      
      gsap.to(meshRef.current.rotation, {
        z: rotation[2] + Math.PI / 6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, [position, rotation]);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color="#ffb800" wireframe={true} />
    </mesh>
  );
};

// Background Circuit Lines Component
const CircuitLines = () => {
  const linesRef = useRef<THREE.Group | null>(null);
  
  useEffect(() => {
    if (linesRef.current) {
      gsap.to((linesRef.current.rotation), {
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
      points.push(new Vector3(i, j, 0));
      if (Math.random() > 0.5) {
        points.push(new Vector3(i + Math.random(), j + Math.random(), 0));
        points.push(new Vector3(i + Math.random(), j + Math.random(), 0));
      }
    }
  }
  
  return (
    <group ref={linesRef}>
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes.position"
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
  const doodlesRef = useRef<HTMLDivElement | null>(null);
  
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
interface StatsCardProps {
  icon: React.ReactNode;
  number: string | number;
  label: string;
  delay: number;
}

const StatsCard = ({ icon, number, label, delay }: StatsCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  
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
  }, [delay]);
  
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

// Main TeacherHomePage Component
const TeacherHomePage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  
  useEffect(() => {
    // Initialize GSAP animations
    const heading = headingRef.current;
    const subtitle = subtitleRef.current;
    
    if (heading && subtitle) {
      gsap.fromTo(Array.from(heading.children), 
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
    <div ref={containerRef} className="relative rounded-2xl bg-gray-50 text-gray-800 overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 parallax-section">
          <StatsCard icon="👨‍🎓" number="124" label="Active Students" delay={0.2} />
          <StatsCard icon="📚" number="18" label="Courses Created" delay={0.3} />
          <StatsCard icon="🎯" number="85%" label="Completion Rate" delay={0.4} />
          <StatsCard icon="⭐" number="4.8" label="Average Rating" delay={0.5} />
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