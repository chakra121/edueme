import Link from "next/link";
import React from "react";

const Brief = () => {
  return (
    <div className="relative flex flex-col items-center justify-between space-y-4 py-[6rem]">
      <div className="relative flex flex-col justify-between bg-yellow-100 px-24 py-6">
        <h1 className="px-[5%] py-7 font-sans text-5xl font-bold text-black">
          Robotics with Artificial Intellegence(AI)
        </h1>
        <p className="text-lg font-semibold text-black">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis,
          distinctio nostrum assumenda cum reprehenderit ipsa error doloribus
          iure natus fugiat molestias dolorem iusto facere beatae! Suscipit
          cupiditate vero non iure repellat reprehenderit fuga sapiente ratione,
          possimus, voluptates architecto obcaecati optio animi harum quod
          blanditiis asperiores nemo pariatur iusto labore impedit libero fugiat
          ea facilis! Reprehenderit consequatur, eligendi quod similique quia
          placeat debitis sint assumenda ex, ipsa laboriosam! Accusantium fugiat
          velit tempore dicta unde optio nulla magnam tenetur dignissimos
          deleniti, soluta aspernatur ducimus porro commodi sequi aut dolor
          voluptatum pariatur quidem ab cum esse blanditiis. Maiores maxime iure
          sunt quaerat qui.
        </p>
      </div>
      <Link
        href="\courses"
        className="flex w-[8%] items-center rounded-2xl bg-yellow-500 p-4 text-amber-950 transition duration-300 ease-in-out hover:scale-110 hover:bg-yellow-400"
      >
        ← Go Back
      </Link>
    </div>
  );
};

export default Brief;
