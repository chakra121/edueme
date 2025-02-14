"use client";

import React, { useEffect, useState } from "react";

const CurriculumHighlights = () => {
  const [theme, setTheme] = useState("bumblebee");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "bumblebee";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const highlights = [
    { name: "Innovation", image: "unused.jpg" },
    { name: "Technology", image: "unused.jpg" },
    { name: "Research", image: "unused.jpg" },
    { name: "Development", image: "unused.jpg" },
    { name: "Collaboration", image: "unused.jpg" },
    { name: "Growth", image: "unused.jpg" },
  ];

  return (
    <section className="flex flex-col items-center justify-center py-16 transition-all duration-500 bg-base-100 text-base-content">
      <h2 className="text-4xl font-bold text-center mb-10">Curriculum Highlights</h2>
      <div className="grid grid-cols-3 gap-10 max-w-4xl mx-auto justify-items-center">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl w-[5.5cm] h-[8cm] bg-base-200 text-base-content"
          >
            <div className="w-[4.5cm] h-[4.5cm] bg-base-300 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              <img src={highlight.image} alt={highlight.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 text-lg font-semibold">{highlight.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurriculumHighlights;
