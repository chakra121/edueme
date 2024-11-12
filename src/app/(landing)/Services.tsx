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
            className="h-60 w-auto rounded-full"
            src="services_online.jpg"
          ></img>
          <h3 className="justify-center text-balance p-4 text-xl font-semibold lg:max-w-[60%] lg:text-xl">
            Online Learning
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img
            className="h-60 w-auto rounded-full"
            src="services_notes.jpg"
          ></img>
          <h3 className="justify-center text-balance p-4 text-xl font-semibold lg:max-w-[60%] lg:text-xl">
            Online Notes
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <img
            className="h-60 w-auto rounded-full"
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
          className="rounded-lg bg-amber-400 font-semibold normal-case p-3 hover:text-white text-black hover:bg-transparent"
        >
          Courses Outcome
        </Link>
      </div>
    </div>
  );
}

export default Services