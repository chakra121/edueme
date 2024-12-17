"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RainbowButton } from "./ui/rainbow-button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed z-[99] flex w-full items-center justify-between bg-black/20 px-[1rem] py-[0.5rem] text-white backdrop-blur-md lg:px-[10%]">
      {/* Logo Section */}
      <Link href="/">
        <Image
          className="hidden h-14 w-auto transition duration-300 ease-in-out hover:scale-105 lg:block"
          width={300}
          height={300}
          src="/logo_white.png"
          alt="logo"
        />
        <Image
          className="block h-10 w-auto transition duration-300 ease-in-out hover:scale-105 lg:hidden"
          width={200}
          height={200}
          src="/logo_white.png"
          alt="logo"
        />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden gap-6 lg:flex">
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
        {/*button for temp dashboard */}
        <Link
          href="/dashboard"
          className="rounded-md px-[1rem] py-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:text-black"
        >
          Dashboard
        </Link>
      </div>

      {/* Book Demo Button */}
      <Link
        href="/auth/login"
        className="hidden transition duration-300 ease-in-out hover:scale-105 lg:block"
      >
        <RainbowButton>Get Started</RainbowButton>
      </Link>

      {/* Mobile Menu (Hamburger Icon) */}
      <div className="lg:hidden">
        <button onClick={() => setIsMenuOpen((prev) => !prev)} className="p-2">
          <svg
            className="h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 top-[4rem] z-50 w-full bg-black text-white shadow-lg lg:hidden">
          <div className="flex flex-col items-start space-y-4 px-6 py-4">
            <Link
              href="/"
              className="w-full rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="w-full rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/courses"
              className="w-full rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/demoFrom"
              className="w-full mr-12 rounded-md bg-yellow-500 px-4 py-2 text-black transition duration-300 ease-in-out hover:bg-yellow-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Demo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
