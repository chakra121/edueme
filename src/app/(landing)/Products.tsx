import React from "react";

const Products = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="text-balance pb-5 text-4xl font-bold lg:max-w-[60%] lg:text-4xl">
        <h1>Our Products:</h1>
      </div>
      <div className="relative z-10 flex gap-10 p-10">
        <img className="h-auto w-80 rounded-full" src="/nuroscience.jpg"></img>
        <img className="h-auto w-80 rounded-full" src="/ai_robotics.jpg"></img>
        <img className="h-auto w-80 rounded-full" src="/young_innovators.jpg"></img>
      </div>
    </div>
  );
};

export default Products;
