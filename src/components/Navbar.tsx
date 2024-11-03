import React from "react";
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="fixed w-full flex items-center justify-between bg-gradient-to-r from-yellow-200 to-orange-400 px-[10%] py-[0.3rem] shadow-xl z-[99]">
      <div >
        <img className="h-14 w-auto" src="/Edueme_Final_Logo.png" alt="logo" />
      </div>

      <div className="hidden lg:flex items-center gap-[1rem]">
        <Link
          href="/"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          Contact
        </Link>
        <Link
          href="/demoFrom"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          Book Demo
        </Link>
        <Link
          href="/"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          Courses
        </Link>
        <Link
          href="/login"
          className="rounded-md bg-orange-100 px-[1rem] py-[0.5rem] text-black hover:bg-orange-500 hover:text-white hover:shadow-lg"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-md bg-orange-100 px-[1rem] py-[0.5rem] text-black hover:bg-orange-500 hover:text-white hover:shadow-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Navbar