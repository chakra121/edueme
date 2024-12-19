"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RainbowButton } from "./ui/rainbow-button";
import {
    HomeIcon,
    UserIcon,
    ClipboardDocumentIcon,
    BookOpenIcon,
    Cog6ToothIcon,
    QuestionMarkCircleIcon,
    ClockIcon,
  } from "@heroicons/react/24/outline"; // Correct import for v2



const Sidepanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <aside className="w-64 bg-blue-100 p-6 rounded-lg shadow-sm text-black ">
        <h2 className="mb-8 text-2xl font-bold"></h2>
        <ul className="space-y-6">
          <li className="active flex items-center">
            <HomeIcon className="h-6 w-6 text-gray-400" />
            <Link 
            href="/dashboard"
            className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Home
            </Link>
          </li>
          <li className="active flex items-center">
            <UserIcon className="h-6 w-6 text-gray-400" />
            <Link href="/dprofile" className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Profile
            </Link>
          </li>
          <li className="active flex items-center">
            <BookOpenIcon className="h-6 w-6 text-gray-400" />
            <Link 
            href="/denrolled"
            className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Enrolled Course
            </Link>
          </li>
          <li className="active flex items-center">
            <ClipboardDocumentIcon className="h-6 w-6 text-gray-400" />
            <Link 
            href="/dassesment"
            className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Assessment
            </Link>
          </li>
          <li className="active flex items-center">
            <Cog6ToothIcon className="h-6 w-6 text-gray-400" />
            <Link 
            href="/dprogress"
            className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Course Progress
            </Link>
          </li>
          <li className="active flex items-center">
            <ClockIcon className="h-6 w-6 text-gray-400" />
            <Link 
            href="/dupsessions"
            className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Upcoming Sessions
            </Link>
          </li>
          <li className="active flex items-center">
            <QuestionMarkCircleIcon className="h-6 w-6 text-gray-400" />
            <Link 
            href="/dhelp"
            className="ml-2 text-left font-sans text-lg hover:font-bold hover:cursor-pointer">
              Help
            </Link>
          </li>
        </ul>
      </aside>
      )};

export default Sidepanel;
