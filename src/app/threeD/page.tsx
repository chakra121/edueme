'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Data for the information cards
const allCardData = [
  // Left Cards (animate top to bottom)
  { id: 'l1', title: "Robotics Basics", description: "Fundamentals of robotic systems and components.", image: "/placeholder_image_1.webp", side: "left" },
  { id: 'l2', title: "AI Integration", description: "How AI powers intelligent robot behavior and decision making.", image: "/placeholder_image_2.webp", side: "left" },
  { id: 'l3', title: "Sensor Technology", description: "Exploring various sensors: vision, lidar, tactile.", image: "/placeholder_image_3.webp", side: "left" },
  { id: 'l4', title: "Motion Planning", description: "Algorithms for robot navigation and pathfinding in complex environments.", image: "/placeholder_image_4.webp", side: "left" },
  { id: 'l5', title: "Robot Ethics", description: "Considering the ethical implications of advanced robotics.", image: "/placeholder_image_5.webp", side: "left" },

  // Right Cards (animate bottom to top)
  { id: 'r1', title: "Mini Robot Showcase", description: "Interactive 3D view of our featured mini robot.", image: "/coursebg.webp", side: "right" },
  { id: 'r2', title: "Advanced Controls", description: "Explore the interactive model with advanced controls and camera options.", image: "/coursebg.webp", side: "right" }, // Original card, modified
  { id: 'r3', title: "Kinematics Deep Dive", description: "Understanding the study of motion without considering external forces.", image: "/placeholder_image_6.webp", side: "right" },
  { id: 'r4', title: "Robot Dynamics", description: "Analyzing forces and torques that affect robot movement and stability.", image: "/placeholder_image_7.webp", side: "right" },
  { id: 'r5', title: "Real-world Applications", description: "Discover how robots are used in industry, healthcare, and exploration.", image: "/placeholder_image_8.webp", side: "right" },
];

// Helper to get placeholder images if actual ones are missing
const getImagePath = (path) => {
  const knownImages = ["/coursebg.webp"]; 
  if (knownImages.includes(path) || path.startsWith("/placeholder_image_")) { // crude check
    if (path.startsWith("/placeholder_image_")) return "/coursebg.webp"; // Use a known image for placeholders
    return path;
  }
  return "/coursebg.webp"; // Fallback
};


function Model() {
  const { scene } = useGLTF('/mini_robot.glb')
  return (
    <primitive 
      object={scene} 
      scale={[2, 2, 2]} 
      position={[0, -1, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10))
    }, 200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      textAlign: 'center',
      zIndex: 20, // Ensure loader is above other elements if necessary
    }}>
      <div className="loader-spinner"></div>
      <div>Loading... {progress}%</div>
    </div>
  )
}

interface InfoCardProps {
  title: string;
  description: string;
  image: string;
  cardStyle: React.CSSProperties;
  side: string;
}

function InfoCard({ title, description, image, cardStyle, side }: InfoCardProps) {
  const variants = {
    initial: {
      opacity: 0,
      y: side === 'left' ? -100 : 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: side === 'left' ? 100 : -100,
      transition: {
        duration: 1.5,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: 'absolute',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '10px',
        width: '280px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
        ...cardStyle,
      }}
      className="info-card"
      whileHover={{
        scale: 1.05,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
      }}
    >
      <img 
        src={getImagePath(image)}
        alt={title}
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
      />
      <h3 style={{ margin: '15px 0 10px', fontSize: '1.2rem', color: '#333' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#555' }}>{description}</p>
    </motion.div>
  );
}

export default function ThreeDPage() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentLeftStartIndex, setCurrentLeftStartIndex] = useState(0);
  const [currentRightStartIndex, setCurrentRightStartIndex] = useState(0);

  const cardsToDisplayPerSide = 2;
  const cardMarginBottom = 30; // Space between cards vertically
  const cardHeight = 320; // Approximate height: 150 (img) + 20 (padding) + 30 (h3) + 50 (p) + 20 (padding) + margins...  Adjust as needed.

  const leftCardsData = allCardData.filter(c => c.side === 'left');
  const rightCardsData = allCardData.filter(c => c.side === 'right');

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      if (leftCardsData.length > 0) {
        setCurrentLeftStartIndex(prev => (prev + 1) % leftCardsData.length);
      }
      if (rightCardsData.length > 0) {
        setCurrentRightStartIndex(prev => (prev + 1) % rightCardsData.length);
      }
    }, 4000); // Change cards every 4 seconds

    // Set initial load to false after the first animation cycle could have finished
    const initialLoadEffectTimer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 700); // Corresponds to initial animation duration

    return () => {
      clearInterval(carouselTimer);
      clearTimeout(initialLoadEffectTimer);
    };
  }, [leftCardsData.length, rightCardsData.length]);

  const getVisibleCardsData = (dataArray: typeof allCardData, startIndex: number) => {
    const visible = [];
    if (dataArray.length === 0) return visible;
    for (let i = 0; i < cardsToDisplayPerSide; i++) {
      visible.push(dataArray[(startIndex + i) % dataArray.length]);
    }
    return visible;
  };

  const visibleLeftCards = getVisibleCardsData(leftCardsData, currentLeftStartIndex);
  const visibleRightCards = getVisibleCardsData(rightCardsData, currentRightStartIndex);

  const cardBaseTopPosition = 80; // Starting top position for the first card

  return (
    <div style={{ width: '100%', height: '100vh', background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
      <style jsx global>{`
        /* Base styles for info card and hover effects */

        /* Initial slide-in animations */
        @keyframes initialSlideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0) perspective(1000px) rotateX(0) rotateY(0); opacity: 1; }
        }
        @keyframes initialSlideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0) perspective(1000px) rotateX(0) rotateY(0); opacity: 1; }
        }

        /* Carousel animations */
        @keyframes carouselEnterTopToBottom {
          from { transform: translateY(-50%); opacity: 0; } /* Start a bit closer for smoother look */
          to { transform: translateY(0) perspective(1000px) rotateX(0) rotateY(0); opacity: 1; }
        }
        @keyframes carouselEnterBottomToTop {
          from { transform: translateY(50%); opacity: 0; } /* Start a bit closer */
          to { transform: translateY(0) perspective(1000px) rotateX(0) rotateY(0); opacity: 1; }
        }

        .card-initial-slide-left { animation: initialSlideInLeft 0.7s ease-out forwards; }
        .card-initial-slide-right { animation: initialSlideInRight 0.7s ease-out forwards; }
        .card-carousel-enter-ttb { animation: carouselEnterTopToBottom 0.7s ease-out forwards; } /* Top To Bottom */
        .card-carousel-enter-btt { animation: carouselEnterBottomToTop 0.7s ease-out forwards; } /* Bottom To Top */

        /* Loader spinner */
        .loader-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <Canvas
        shadows // Enable shadows
        camera={{
          position: [3, 3, 4], // Slightly adjusted camera
          fov: 50,
          near: 0.1,
          far: 1000
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.5} 
          castShadow // Light casts shadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}> {/* Use a proper loader for canvas if needed, e.g., Drei's Html + useProgress */}
          <Model />
        </Suspense>
        <OrbitControls 
          minDistance={2}
          maxDistance={10}
          target={[0, 0, 0]}
          enablePan={false} // Optional: disable panning for a cleaner orbit
        />
        {/* Optional: Add a ground plane to receive shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      </Canvas>

      {/* Left Cards */}
      <AnimatePresence mode="wait">
        {visibleLeftCards.map((card, index) => (
          <InfoCard
            key={`${card.id}-${index}`}
            {...card}
            cardStyle={{
              left: '30px',
              top: `${cardBaseTopPosition + index * (cardHeight + cardMarginBottom)}px`,
            }}
            side="left"
          />
        ))}
      </AnimatePresence>

      {/* Right Cards */}
      <AnimatePresence mode="wait">
        {visibleRightCards.map((card, index) => (
          <InfoCard
            key={`${card.id}-${index}`}
            {...card}
            cardStyle={{
              right: '30px',
              top: `${cardBaseTopPosition + index * (cardHeight + cardMarginBottom)}px`,
            }}
            side="right"
          />
        ))}
      </AnimatePresence>
      
      {/* Preloader for the model - this Suspense block handles the hidden Model instance */}
      {/* The Loader component will show based on its internal fake progress */}
      {/* For a real loading tied to GLB, integrate useProgress with Suspense fallback for the Canvas */}
      <Suspense fallback={<Loader />}>
        <div style={{ display: 'none' }}>
          <Model /> {/* This instance is for preloading */}
        </div>
      </Suspense>
    </div>
  )
}