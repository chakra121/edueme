'use client';

import { useEffect, useRef } from 'react';
import { Orbitron } from 'next/font/google';
import { useRouter } from 'next/navigation';

const orbitron = Orbitron({ subsets: ['latin'], weight: ['400', '700'] });

export default function ErrorPage() {
  const visorRef = useRef<HTMLCanvasElement>(null);
  const cordRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Mouse position tracking for smooth following
  const targetPos = useRef({ x: 0, y: 0 });
  const robotRotation = useRef(0);

  useEffect(() => {
    const drawVisor = () => {
      const canvas = visorRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.beginPath();
      ctx.moveTo(5, 45);
      ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
      ctx.lineTo(55, 20);
      ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
      ctx.lineTo(15, 10);
      ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
      ctx.lineTo(5, 45);
      
      ctx.fillStyle = '#e8e8e8';
      ctx.strokeStyle = '#3b82f6';
      ctx.fill();
      ctx.stroke();
    };
    
    const animateCord = () => {
      const canvas = cordRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      let y1 = 160;
      let y2 = 100;
      let y3 = 100;
      
      let y1Forward = true;
      let y2Forward = false;
      let y3Forward = true;
      
      function animate() {
        if (!canvas || !ctx) return;
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.moveTo(130, 170);
        ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);
        
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 8;
        ctx.stroke();
        
        if (y1 === 100) y1Forward = true;
        if (y1 === 300) y1Forward = false;
        if (y2 === 100) y2Forward = true;
        if (y2 === 310) y2Forward = false;
        if (y3 === 100) y3Forward = true;
        if (y3 === 317) y3Forward = false;
        
        if (y1Forward) {
          y1 += 1;
        } else {
          y1 -= 1;
        }

        if (y2Forward) {
          y2 += 1;
        } else {
          y2 -= 1;
        }

        if (y3Forward) {
          y3 += 1;
        } else {
          y3 -= 1;
        }
      }
      
      animate();
    };
    
    drawVisor();
    animateCord();
    
    // Smooth robot movement animation
    const handleMouseMove = (e: MouseEvent) => {
      // Update target position
      targetPos.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
      
      // Create circuit trail effect
      const circuit = document.createElement('div');
      circuit.className = 'circuit-particle';
      circuit.style.left = `${e.clientX}px`;
      circuit.style.top = `${e.clientY}px`;
      containerRef.current?.appendChild(circuit);
      
      // Remove circuit elements after animation
      setTimeout(() => {
        if (circuit.parentNode === containerRef.current) {
          containerRef.current?.removeChild(circuit);
        }
      }, 1000);
    };
    
    // Smooth animation for robot following cursor
    const animateRobotFollow = () => {
      const robot = document.querySelector('.robot');
      if (robot) {
        // Get robot position
        const robotRect = robot.getBoundingClientRect();
        const robotX = robotRect.left + (robot as HTMLElement).offsetWidth / 2;
        const robotY = robotRect.top + (robot as HTMLElement).offsetHeight / 2;
        
        // Calculate angle to cursor with smooth interpolation
        const angleRad = Math.atan2(targetPos.current.y - robotY, targetPos.current.x - robotX);
        const angleDeg = (angleRad * 180 / Math.PI) - 90;
        
        // Smooth rotation transition
        robotRotation.current += (angleDeg * 0.05 - robotRotation.current) * 0.1;
        
        // Apply smooth transform
        if (robot) {
          if (robot) {
            (robot as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${robotRotation.current}deg) scale(1.2)`;
          }
        }
      }
      
      requestAnimationFrame(animateRobotFollow);
    };
    
    // Start smooth robot animation
    animateRobotFollow();
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  // Navigation handlers
  const handleHomeClick = () => {
    router.push('/');
  };
  
  const handleDashboardClick = () => {
    router.push('/dashboard');
  };
  
  return (
    <div ref={containerRef} className="container">
      <div className="circuit-board"></div>
      <div className="circuit-board__chip circuit-board__chip1"></div>
      <div className="circuit-board__chip circuit-board__chip2"></div>
      <div className="circuit-board__chip circuit-board__chip3"></div>

      <div className="gear gear1"></div>
      <div className="gear gear2"></div>
      <div className="gear gear3"></div>
      <div className="gear gear4"></div>
      <div className="gear gear5"></div>

      <div className={`error ${orbitron.className}`}>
        <div className="error__title">404</div>
        <div className="error__subtitle">Page Not Found</div>
        <div className="error__description">The page you are looking for cannot be found</div>
        <button className="error__button error__button--active" onClick={handleHomeClick}>HOME PAGE</button>
        <button className="error__button" onClick={handleDashboardClick}>DASHBOARD</button>
      </div>

      <div className="robot">
        <div className="robot__backpack"></div>
        <div className="robot__body"></div>
        <div className="robot__body__chest"></div>
        <div className="robot__arm-left1"></div>
        <div className="robot__arm-left2"></div>
        <div className="robot__arm-right1"></div>
        <div className="robot__arm-right2"></div>
        <div className="robot__arm-thumb-left"></div>
        <div className="robot__arm-thumb-right"></div>
        <div className="robot__leg-left"></div>
        <div className="robot__leg-right"></div>
        <div className="robot__foot-left"></div>
        <div className="robot__foot-right"></div>
        <div className="robot__wrist-left"></div>
        <div className="robot__wrist-right"></div>
        
        <div className="robot__cord">
          <canvas ref={cordRef} height="500" width="500"></canvas>
        </div>
        
        <div className="robot__head">
          <canvas ref={visorRef} width="60" height="60"></canvas>
          <div className="robot__head-visor-flare1"></div>
          <div className="robot__head-visor-flare2"></div>
        </div>
      </div>
      
      <style jsx global>{`
        /* Remove any default margins/padding and disable header/footer */
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        
        /* Hide any headers or footers that might be included in the layout */
        header, footer, nav {
          display: none !important;
        }
      `}</style>
      
      <style jsx>{`
        .container {
          height: 100vh;
          width: 100vw;
          margin: 0px;
          background: linear-gradient(90deg, #ffffff 23%, #f5f5f5 100%);
          overflow: hidden;
          position: relative;
          /* Removed cursor: none; to make cursor visible */
        }
        
        .circuit-board {
          background: linear-gradient(90deg, #f0f0f0 48%, #e8e8e8 100%);
          position: absolute;
          top: -100px;
          left: -300px;
          width: 900px;
          height: 900px;
          content: "";
          border-radius: 100%;
          box-shadow: 0px 0px 30px -4px rgba(59, 130, 246, 0.3);
          border: 2px solid #e0e0e0;
          overflow: hidden;
        }
        
        .circuit-board::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .circuit-board__chip {
          position: absolute;
          content: "";
          border-radius: 4px;
          background: linear-gradient(90deg, #e0e0e0 38%, #d0d0d0 100%);
          border: 1px solid #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .circuit-board__chip1 {
          top: 250px;
          left: 500px;
          width: 60px;
          height: 180px;
        }
        
        .circuit-board__chip2 {
          top: 650px;
          left: 340px;
          width: 40px;
          height: 80px;
          transform: rotate(55deg);
        }
        
        .circuit-board__chip3 {
          top: -20px;
          left: 40px;
          width: 65px;
          height: 120px;
          transform: rotate(250deg);
        }
        
        .gear {
          background: #e0e0e0;
          position: absolute;
          width: 40px;
          height: 40px;
          content: "";
          border-radius: 100%;
          border: 2px solid #3b82f6;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
          opacity: 0.4;
          animation: rotate 10s linear infinite;
        }
        
        .gear::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 15px;
          height: 15px;
          background: #3b82f6;
          border-radius: 50%;
        }
        
        .gear::after {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: #e0e0e0;
          border: 1px solid #3b82f6;
          border-radius: 2px;
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .gear1 {
          top: 40%;
          left: 20%;
          animation-duration: 8s;
        }
        
        .gear2 {
          top: 60%;
          left: 80%;
          width: 60px;
          height: 60px;
          animation-duration: 12s;
          animation-direction: reverse;
        }
        
        .gear3 {
          top: 15%;
          left: 70%;
          width: 30px;
          height: 30px;
          animation-duration: 5s;
        }
        
        .gear4 {
          top: 85%;
          left: 40%;
          width: 50px;
          height: 50px;
          animation-duration: 15s;
          animation-direction: reverse;
        }
        
        .gear5 {
          top: 25%;
          left: 30%;
          width: 35px;
          height: 35px;
          animation-duration: 7s;
        }
        
        .circuit-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(59, 130, 246, 0.7);
          border-radius: 50%;
          animation: fade 1s forwards cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          z-index: 1000;
          filter: blur(1px);
        }
        
        @keyframes fade {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(0.6); opacity: 0.5; }
          100% { transform: scale(0); opacity: 0; }
        }
        
        .error {
          position: absolute;
          left: 100px;
          top: 400px;
          transform: translateY(-60%);
          color: #3b82f6;
          z-index: 100;
        }
        
        .error__title {
          font-size: 10em;
          font-weight: 700;
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          line-height: 1;
        }
        
        .error__subtitle {
          font-size: 2em;
          font-weight: 700;
          margin-top: -10px;
        }
        
        .error__description {
          color: #4b5563;
          opacity: 0.8;
          margin-top: 10px;
        }
        
        .error__button {
          min-width: 7em;
          margin-top: 3em;
          margin-right: 0.5em;
          padding: 0.5em 2em;
          outline: none;
          border: 2px solid #3b82f6;
          background-color: transparent;
          border-radius: 8em;
          color: #3b82f6;
          cursor: pointer;
          transition-duration: 0.2s;
          font-size: 0.75em;
          font-family: inherit;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .error__button:hover {
          color: #fff;
        }
        
        .error__button:hover::before {
          width: 100%;
        }
        
        .error__button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0%;
          height: 100%;
          background-color: #3b82f6;
          transition: width 0.3s ease;
          z-index: -1;
        }
        
        .error__button--active {
          background-color: #3b82f6;
          border: 2px solid #3b82f6;
          color: #fff;
        }
        
        .error__button--active:hover {
          box-shadow: 0px 0px 15px 0px rgba(59, 130, 246, 0.7);
          color: #fff;
        }
        
        .robot {
          position: absolute;
          width: 185px;
          height: 300px;
          left: 70%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(0deg) scale(1.2);
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .robot__head {
          background-color: #e0e0e0;
          position: absolute;
          top: 60px;
          left: 60px;
          width: 60px;
          height: 60px;
          content: "";
          border-radius: 10px;
          border: 2px solid #d0d0d0;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .robot__head-visor-flare1 {
          background-color: #3b82f6;
          position: absolute;
          top: 28px;
          left: 40px;
          width: 10px;
          height: 10px;
          content: "";
          border-radius: 2em;
          opacity: 0.7;
          animation: blink 2s infinite alternate;
        }
        
        .robot__head-visor-flare2 {
          background-color: #3b82f6;
          position: absolute;
          top: 40px;
          left: 38px;
          width: 5px;
          height: 5px;
          content: "";
          border-radius: 2em;
          opacity: 0.5;
          animation: blink 3s infinite alternate;
        }
        
        @keyframes blink {
          0%, 90% { opacity: 0.7; }
          95% { opacity: 0; }
          100% { opacity: 0.7; }
        }
        
        .robot__backpack {
          background-color: #d8d8d8;
          position: absolute;
          top: 90px;
          left: 47px;
          width: 86px;
          height: 90px;
          content: "";
          border-radius: 8px;
          border: 1px solid #c0c0c0;
          background-image: linear-gradient(0deg, #d8d8d8 2px, transparent 2px),
                            linear-gradient(90deg, #d8d8d8 2px, transparent 2px);
          background-size: 8px 8px;
          box-shadow: inset 0 0 10px rgba(59, 130, 246, 0.3);
        }
        
        .robot__body {
          background-color: #e0e0e0;
          position: absolute;
          top: 115px;
          left: 55px;
          width: 70px;
          height: 80px;
          content: "";
          border-radius: 8px;
          border: 1px solid #d0d0d0;
        }
        
        .robot__body__chest {
          background-color: #d8d8d8;
          position: absolute;
          top: 140px;
          left: 68px;
          width: 45px;
          height: 25px;
          content: "";
          border-radius: 6px;
          border: 1px solid #c0c0c0;
          box-shadow: inset 0 0 5px rgba(59, 130, 246, 0.5);
        }
        
        .robot__body__chest::after {
          content: "";
          position: absolute;
          top: 10px;
          left: 20px;
          width: 5px;
          height: 5px;
          background: #3b82f6;
          border-radius: 50%;
          animation: blink 1s infinite alternate;
        }
        
        .robot__arm-left1 {
          background-color: #e0e0e0;
          position: absolute;
          top: 127px;
          left: 9px;
          width: 65px;
          height: 20px;
          content: "";
          border-radius: 8px;
          transform: rotate(-30deg);
          border: 1px solid #d0d0d0;
        }
        
        .robot__arm-left2 {
          background-color: #e0e0e0;
          position: absolute;
          top: 102px;
          left: 7px;
          width: 20px;
          height: 45px;
          content: "";
          border-radius: 8px;
          transform: rotate(-12deg);
          border-top-left-radius: 8em;
          border-top-right-radius: 8em;
          border: 1px solid #d0d0d0;
        }
        
        .robot__arm-right1 {
          background-color: #e0e0e0;
          position: absolute;
          top: 113px;
          left: 100px;
          width: 65px;
          height: 20px;
          content: "";
          border-radius: 8px;
          transform: rotate(-10deg);
          border: 1px solid #d0d0d0;
        }
        
        .robot__arm-right2 {
          background-color: #e0e0e0;
          position: absolute;
          top: 78px;
          left: 141px;
          width: 20px;
          height: 45px;
          content: "";
          border-radius: 8px;
          transform: rotate(-10deg);
          border-top-left-radius: 8em;
          border-top-right-radius: 8em;
          border: 1px solid #d0d0d0;
        }
        
        .robot__arm-thumb-left {
          background-color: #e0e0e0;
          position: absolute;
          top: 110px;
          left: 21px;
          width: 10px;
          height: 6px;
          content: "";
          border-radius: 8em;
          transform: rotate(-35deg);
          border: 1px solid #d0d0d0;
        }
        
        .robot__arm-thumb-right {
          background-color: #e0e0e0;
          position: absolute;
          top: 90px;
          left: 133px;
          width: 10px;
          height: 6px;
          content: "";
          border-radius: 8em;
          transform: rotate(20deg);
          border: 1px solid #d0d0d0;
        }
        
        .robot__wrist-left {
          background-color: #3b82f6;
          position: absolute;
          top: 122px;
          left: 6.5px;
          width: 21px;
          height: 4px;
          content: "";
          border-radius: 8em;
          transform: rotate(-15deg);
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.7);
        }
        
        .robot__wrist-right {
          background-color: #3b82f6;
          position: absolute;
          top: 98px;
          left: 141px;
          width: 21px;
          height: 4px;
          content: "";
          border-radius: 8em;
          transform: rotate(-10deg);
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.7);
        }
        
        .robot__leg-left {
          background-color: #e0e0e0;
          position: absolute;
          top: 188px;
          left: 50px;
          width: 23px;
          height: 75px;
          content: "";
          transform: rotate(10deg);
          border: 1px solid #d0d0d0;
          border-radius: 5px;
        }
        
        .robot__leg-right {
          background-color: #e0e0e0;
          position: absolute;
          top: 188px;
          left: 108px;
          width: 23px;
          height: 75px;
          content: "";
          transform: rotate(-10deg);
          border: 1px solid #d0d0d0;
          border-radius: 5px;
        }
        
        .robot__foot-left {
          background-color: #d8d8d8;
          position: absolute;
          top: 240px;
          left: 43px;
          width: 28px;
          height: 20px;
          content: "";
          transform: rotate(10deg);
          border-radius: 3px;
          border-top-left-radius: 8em;
          border-top-right-radius: 8em;
          border-bottom: 4px solid #3b82f6;
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
        }
        
        .robot__foot-right {
          background-color: #d8d8d8;
          position: absolute;
          top: 240px;
          left: 111px;
          width: 28px;
          height: 20px;
          content: "";
          transform: rotate(-10deg);
          border-radius: 3px;
          border-top-left-radius: 8em;
          border-top-right-radius: 8em;
          border-bottom: 4px solid #3b82f6;
          box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}