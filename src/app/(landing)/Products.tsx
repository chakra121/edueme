import React from "react";
import Image from "next/image";

const Products = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="text-balance pb-5 text-4xl font-bold lg:max-w-[60%] lg:text-4xl">
        <h1>Our Products:</h1>
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row gap-10 p-10 justify-center items-center">
        <Image width={200} height={200} className="p-[1rem] border size-[15rem] rounded-full" alt="Product" src="/nuroscience.jpg"></Image>
        <Image width={200} height={200} className="p-[1rem] border size-[15rem] rounded-full" alt="Product" src="/ai_robotics.jpg"></Image>
        <Image width={200} height={200} className="p-[1rem] border size-[15rem] rounded-full" alt="Product" src="/young_innovators.jpg"></Image>
      </div>
    </div>
  );
};

export default Products;
