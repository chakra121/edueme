// "use client";
// import { useEffect, useState } from "react";

// const CustomCursor = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [outerCursorPosition, setOuterCursorPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (event: MouseEvent) => {
//       setMousePosition((prev) => {
//         const newPosition = { x: event.clientX, y: event.clientY };
//         if (Math.abs(newPosition.x - prev.x) > 5 || Math.abs(newPosition.y - prev.y) > 5) {
//           return newPosition;
//         }
//         return prev;
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   useEffect(() => {
//     const animateCursor = () => {
//       setCursorPosition((prev) => ({
//         x: prev.x + (mousePosition.x - prev.x) * 0.35,
//         y: prev.y + (mousePosition.y - prev.y) * 0.35,
//       }));

//       setOuterCursorPosition((prev) => ({
//         x: prev.x + (cursorPosition.x - prev.x) * 0.45,
//         y: prev.y + (cursorPosition.y - prev.y) * 0.45,
//       }));

//       requestAnimationFrame(animateCursor);
//     };

//     animateCursor();
//   }, [mousePosition, cursorPosition]);

//   return (
//     <>
//       <div
//         style={{
//           position: "fixed",
//           top: cursorPosition.y,
//           left: cursorPosition.x,
//           width: "12px",
//           height: "12px",
//           borderRadius: "50%",
//           backgroundColor: "brown",
//           pointerEvents: "none",
//           transform: "translate(-50%, -50%)",
//           transition: "background-color 0.2s ease, transform 0.2s ease",
//           zIndex: 1001,
//         }}
//       />
//       <div
//         style={{
//           position: "fixed",
//           top: outerCursorPosition.y,
//           left: outerCursorPosition.x,
//           width: "25px",
//           height: "25px",
//           borderRadius: "50%",
//           backgroundColor: "transparent",
//           border: "2px solid orange",
//           pointerEvents: "none",
//           transform: "translate(-50%, -50%)",
//           transition: "background-color 0.2s ease, transform 0.2s ease",
//           zIndex: 1000,
//         }}
//       />
//     </>
//   );
// };

// export default CustomCursor; 

