import React, { useEffect, useState } from "react";

const MOFC = () => {
  const [theme, setTheme] = useState("bumblebee");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "bumblebee";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "bumblebee" ? "dark" : "bumblebee";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const images = ["/mofc1.jpg", "/mofc2.jpg", "/mofc3.jpg", "/mofc4.jpg"];

  return (
    <section className="flex flex-col items-center justify-center py-16 bg-base-100 text-base-content">
      <h2 className="text-4xl font-bold text-center mb-10">Mission of Curriculum</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-8">
        {images.map((image, index) => (
          <div key={index} className="relative w-full max-w-[300px] h-[300px] aspect-square [perspective:1000px]">
            <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
              {/* Front Side */}
              <div
                className="absolute inset-0 bg-cover bg-center rounded-lg [backface-visibility:hidden] shadow-lg"
                style={{ backgroundImage: `url(${image})` }}
              ></div>
              {/* Back Side */}
              <div className="absolute inset-0 bg-base-200 rounded-lg flex flex-col items-center justify-center p-4 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-lg">
                <h3 className="text-2xl font-bold">Lorem Ipsum</h3>
                <p className="text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad labore autem illum, saepe vero non nemo dolorem.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MOFC;
