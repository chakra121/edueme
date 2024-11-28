import React from 'react'

const RoboticsAI = () => {
  return (
    <div className="flex flex-col justify-center space-y-10 px-16 pb-8 pt-[8rem]">
      {/* Robotics */}
      <h1 className="p-2 text-center font-sans text-4xl font-bold">
        Robotics with Artificial Intelligence
      </h1>
      <div className="grid-row-2 grid">
        <div className="grid grid-cols-3 gap-7 px-6 py-3">
          {/* 3-4 */}
          <div className="transform space-y-3 rounded-lg border-2 border-yellow-500 bg-yellow-100 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <img src="/courses/kid_robo.jpg" className="rounded-t-xl"></img>
            <h1 className="px-4 text-2xl font-bold">3rd - 4th Grade</h1>
            <p className="px-4 text-sm text-gray-700">4 Chapters</p>
            <p className="px-4 pb-3 text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
              perferendis repellat nulla magnam recusandae ex vero dolorem eius
              ducimus laboriosam reiciendis architecto, commodi ipsa possimus.
              Soluta illo accusantium rerum quae.
            </p>
          </div>
          {/* 5-6 */}
          <div className="transform rounded-lg border-2 border-yellow-500 bg-yellow-100 p-4 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <h1 className="text-2xl font-bold">5th - 6th Grade</h1>
            <p className="text-sm text-gray-700">4 Chapters</p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
              perferendis repellat nulla magnam recusandae ex vero dolorem eius
              ducimus laboriosam reiciendis architecto, commodi ipsa possimus.
              Soluta illo accusantium rerum quae.
            </p>
          </div>
          {/* 7-8 */}
          <div className="transform rounded-lg border-2 border-yellow-500 bg-yellow-100 p-4 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <h1 className="text-2xl font-bold">7th - 8th Grade</h1>
            <p className="text-sm text-gray-700">4 Chapters</p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
              perferendis repellat nulla magnam recusandae ex vero dolorem eius
              ducimus laboriosam reiciendis architecto, commodi ipsa possimus.
              Soluta illo accusantium rerum quae.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-7 px-64 py-3">
          {/* 9-10 */}
          <div className="transform rounded-lg border-2 border-yellow-500 bg-yellow-100 p-4 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <h1 className="text-2xl font-bold">9th - 10th Grade</h1>
            <p className="text-sm text-gray-700">4 Chapters</p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
              perferendis repellat nulla magnam recusandae ex vero dolorem eius
              ducimus laboriosam reiciendis architecto, commodi ipsa possimus.
              Soluta illo accusantium rerum quae.
            </p>
          </div>
          {/* 11-12 */}
          <div className="transform rounded-lg border-2 border-yellow-500 bg-yellow-100 p-4 font-semibold text-yellow-900 transition duration-500 ease-in-out hover:z-10 hover:-translate-y-1 hover:scale-105 hover:bg-yellow-300 hover:text-yellow-950">
            <h1 className="text-2xl font-bold">11th - 12th Grade</h1>
            <p className="text-sm text-gray-700">4 Chapters</p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis
              perferendis repellat nulla magnam recusandae ex vero dolorem eius
              ducimus laboriosam reiciendis architecto, commodi ipsa possimus.
              Soluta illo accusantium rerum quae.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoboticsAI