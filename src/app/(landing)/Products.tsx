import React, { useEffect, useState } from "react";
import Image from "next/image";

const Products = () => {
  const [theme, setTheme] = useState("bumblebee");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "bumblebee";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 lg:px-20 bg-base-100 text-base-content">
      {/* Title Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Our Products:</h1>
      </div>

      {/* Products Section */}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {/* Product 1 */}
        <Image
          width={300}
          height={300}
          className="h-[10rem] w-[10rem] rounded-full border border-base-content p-[1rem] md:h-[12rem] md:w-[12rem] lg:h-[15rem] lg:w-[15rem]"
          alt="Product - Neuroscience"
          src="/nuroscience.jpg"
        />

        {/* Product 2 */}
        <Image
          width={300}
          height={300}
          className="h-[10rem] w-[10rem] rounded-full border border-base-content p-[1rem] md:h-[12rem] md:w-[12rem] lg:h-[15rem] lg:w-[15rem]"
          alt="Product - AI Robotics"
          src="/ai_robotics.jpg"
        />

        {/* Product 3 */}
        <Image
          width={300}
          height={300}
          className="h-[10rem] w-[10rem] rounded-full border border-base-content p-[1rem] md:h-[12rem] md:w-[12rem] lg:h-[15rem] lg:w-[15rem]"
          alt="Product - Young Innovators"
          src="/young_innovators.jpg"
        />
        
        {/* Product 4 */}
        <Image
          width={300}
          height={300}
          className="h-[10rem] w-[10rem] rounded-full border border-base-content p-[1rem] md:h-[12rem] md:w-[12rem] lg:h-[15rem] lg:w-[15rem]"
          alt="Mechatronites_Club"
          src="/mech_logo.jpg"
        />
      </div>
    </div>
  );
};

export default Products;