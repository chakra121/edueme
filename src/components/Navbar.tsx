"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RainbowButton } from "./ui/rainbow-button";
import { usePathname } from "next/navigation";
import classname from "classnames";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const currentPath = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Events", href: "/events" },
    { label: "Research", href: "/research" },
    { label: "Contact Us", href: "/contact" },
    { label: "Why Us", href: "/whyus" },
    // { label: "How", href: "/how" },
    // { label: "Blogs", href: "/blogs" },

  ];

  return (
    <div className="m fixed z-[99] mb-4 flex h-16 w-full items-center justify-center space-x-32 bg-black/90 px-5 py-[0.5rem] backdrop-blur-md">
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
      <div className="hidden items-center space-x-10 lg:flex">
        <ul className="flex items-center space-x-4">
          {links.map((link) => (
            <Link
              key={link.href}
              className={classname({
                "rounded-md px-[1rem] py-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:text-black":
                  true,
                "text-yellow-300": currentPath === link.href,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        {/*

`rounded-md px-[1rem] text-gray-200 py-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:text-black`

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
        </Link>  */}
        <Link
          href="/auth/login"
          className="justify- hidden w-10 transition duration-300 ease-in-out hover:scale-105 lg:block"
        >
          <RainbowButton>Login</RainbowButton>
        </Link>
      </div>

      <label className="swap swap-rotate">
        {/* <!-- this hidden checkbox controls the state --> */}
        <input type="checkbox" className="theme-controller" value="dracula" />

        {/* <!-- sun icon --> */}
        <svg
          className="swap-off h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>

        {/* <!-- moon icon --> */}
        <svg
          className="swap-on h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>

      {/* Book Demo Button */}

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

      {/* Mobile Dropdown Menu
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
      )} */}
    </div>
  );
};

export default Navbar;
