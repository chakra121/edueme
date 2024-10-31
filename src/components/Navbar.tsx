import React, { useState, useEffect } from "react";
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-gradient-to-r from-yellow-200 to-orange-400 px-[10%] pb-[0.5rem] pt-[0.5rem] hover:shadow-xl">
      <div>
        <img src="/logo.png" alt="logo" />
      </div>

      <div className="flex items-center gap-[1rem]">
        <Link
          href="/"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          Home
        </Link>
        <Link
          href="/"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          About
        </Link>
        <Link
          href="/"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          Contact
        </Link>
        <Link
          href="/"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          Book Demo
        </Link>
        <Link
          href="/"
          className="rounded-md px-[1rem] py-[0.5rem] hover:bg-yellow-500 hover:text-white hover:shadow-xl"
        >
          Take Live Test
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
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Navbar