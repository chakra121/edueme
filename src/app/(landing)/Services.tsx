import React from 'react'
import Link from 'next/link';

const Services = () => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="text-balance pb-5 text-4xl font-bold lg:max-w-[60%] lg:text-4xl">
        <h1>Our Services:</h1>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-10 p-10 lg:flex-row">
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img
            className="h-48 w-auto rounded-full"
            src="services_online.jpg"
          ></img>
          <h3 className="justify-center text-balance py-4 text-xl font-semibold lg:max-w-[60%] lg:text-xl">
            Online Learning
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img
            className="h-48 w-auto rounded-full"
            src="services_notes.jpg"
          ></img>
          <h3 className="justify-center text-balance p-4 text-xl font-semibold lg:max-w-[60%] lg:text-xl">
            Online Notes
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img
            className="h-48 w-auto rounded-full"
            src="services_projects.avif"
          ></img>
          <h3 className="justify-center text-balance p-4 text-xl font-semibold lg:max-w-[60%] lg:text-xl">
            Projects
          </h3>
        </div>
      </div>
      <div className="flex flex-col pb-5">
        <Link
          href="/outcome"
          className="rounded-lg bg-amber-400 p-3 py-2 font-semibold normal-case text-black transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-400 hover:text-yellow-900"
        >
          Courses Outcome
        </Link>
        <Link href="/gallery" className="items-center bg-red-500 p-5">
          Gallery
        </Link>
      </div>
    </div>
  );
}

export default Services