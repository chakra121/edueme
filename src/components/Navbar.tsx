import React from "react";
import Link from "next/link";
import Image from "next/image";
import { RainbowButton } from "./ui/rainbow-button";

const Navbar = () => {
  return (
    <div className="fixed z-[99] flex w-full items-center justify-between gap-[1rem] bg-black/20 px-[1rem] py-[0.5rem] text-white backdrop-blur-md lg:px-[10%]">
      <Link href="/">
        <Image
          className="hidden h-14 w-auto lg:block"
          width={300}
          height={300}
          src="/logo_white.png"
          alt="logo"
        />
        <Image
          className="block lg:hidden"
          width={200}
          height={200}
          src="/logo_white.png"
          alt="logo"
        />
      </Link>

      <div className="hidden items-center gap-[1rem] lg:flex">
        <Link
          href="/"
          className="rounded-md px-[1rem] py-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:text-black"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="rounded-md px-[1rem] py-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:text-black"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="rounded-md px-[1rem] py-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:text-black"
        >
          Contact
        </Link>

        <Link
          href="/courses"
          className="rounded-md px-[1rem] py-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:text-black"
        >
          Courses
        </Link>
      </div>
      <Link
        href="/demoFrom"
        className="transition duration-300 ease-in-out hover:scale-105"
      >
        <RainbowButton>Book Demo</RainbowButton>
      </Link>
    </div>
  );
};

export default Navbar;
