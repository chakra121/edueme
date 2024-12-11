import React from "react";
import Link from "next/link";
import Image from "next/image";

const RoboticsAI = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Robotics */}
      <h1 className="p-2 py-8 text-center font-sans text-4xl font-bold">
        Robotics with Artificial Intelligence
      </h1>
      <div className="grid grid-rows-1">
        <div className="grid w-full grid-cols-1 items-center gap-4 lg:grid-cols-3">
          {/* 2-3 */}
          <div className="transform items-center rounded-lg border-2 border-yellow-500 bg-yellow-100 px-4 pb-4 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <Image
              src="/courses/rbai.png"
              width="250"
              height="250"
              alt=""
              className="items-center justify-center"
            ></Image>
            <Link href="/" className="text-2xl font-bold hover:underline">
              2nd - 3rd Grade
            </Link>
            <p className="text-lg"></p>
          </div>

          {/* 4-5 */}
          <div className="transform rounded-lg border-2 border-yellow-500 bg-yellow-100 px-4 pb-4 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <Image
              src="/courses/rbai.png"
              width="250"
              height="250"
              alt=""
              className="items-center justify-center"
            ></Image>
            <Link href="/" className="text-2xl font-bold hover:underline">
              4th - 5th Grade
            </Link>
            <p className="text-lg"></p>
          </div>

          {/* 6-7 */}
          <div className="transform rounded-lg border-2 border-yellow-500 bg-yellow-100 px-4 pb-4 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <Image
              src="/courses/rbai.png"
              width="250"
              height="250"
              alt=""
              className="items-center justify-center"
            ></Image>
            <Link
              href="/courses/6_7"
              className="text-2xl font-bold hover:underline"
            >
              6th - 7th Grade
            </Link>
            <p className="text-lg"></p>
          </div>
        </div>
        <div className="grid w-full items-center gap-[1rem] pt-5 lg:grid-cols-2 lg:px-[17%]">
          {/* 8-9 */}
          <div className="transform rounded-lg border-2 border-yellow-500 bg-yellow-100 px-4 pb-4 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <Image
              src="/courses/rbai.png"
              width="250"
              height="250"
              alt=""
              className="items-center justify-center"
            ></Image>
            <Link
              href="/courses/8_9"
              className="text-2xl font-bold hover:underline"
            >
              8th - 9th Grade
            </Link>
            <p className="text-lg"></p>
          </div>

          {/* 10-12 */}
          <div className="transform rounded-lg border-2 border-yellow-500 bg-yellow-100 px-4 pb-4 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <Image
              src="/courses/rbai.png"
              width="250"
              height="250"
              alt=""
              className="items-center justify-center"
            ></Image>
            <Link
              href="/courses/10_12"
              className="text-2xl font-bold hover:underline"
            >
              10th - 12th Grade
            </Link>

            <p className="text-lg"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoboticsAI;
