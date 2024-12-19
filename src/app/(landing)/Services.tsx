import React from "react";

const AiRoboticsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 py-10">
      {/* Title Section */}
      <div className="mb-10 text-center text-white">
        <h1 className="mb-4 text-4xl font-bold">Services by Edueme</h1>
        <p className="max-w-2xl text-center text-lg">
          Edueme provides educators and students with the tools to cultivate
          coding and problem-solving skills, enabling them to engineer their
          future.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-8 px-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-white shadow-md">
          <div className="relative h-48 w-full overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s1.jpeg"
              alt="Educational Kits"
              className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="w-full bg-blue-500 py-4 text-center">
            <h2 className="text-2xl font-bold text-white">STEM Lab Setups</h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-white shadow-md">
          <div className="relative h-48 w-full overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s2.jpeg"
              alt="PictoBlox"
              className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="w-full bg-blue-500 py-4 text-center">
            <h2 className="text-2xl font-bold text-white">Online Learning</h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-white shadow-md">
          <div className="relative h-48 w-full overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s3.jpeg"
              alt="Curriculum"
              className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="w-full bg-blue-500 py-4 text-center">
            <h2 className="text-2xl font-bold text-white">Curriculum</h2>
          </div>
        </div>

        {/* Card 4 */}
        <div className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-white shadow-md">
          <div className="relative h-48 w-full overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s4.jpeg"
              alt="Teacher Development Program"
              className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="w-full bg-blue-500 py-4 text-center">
            <h2 className="text-2xl font-bold text-white">Skilled Trainers</h2>
          </div>
        </div>

        {/* Card 5 */}
        <div className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-white shadow-md">
          <div className="relative h-48 w-full overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s5.png"
              alt="Codeavour"
              className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="w-full bg-blue-500 py-4 text-center">
            <h2 className="text-2xl font-bold text-white">In-class Learning</h2>
          </div>
        </div>
        {/* Card 6 */}
        <div className="group relative flex flex-col items-center overflow-hidden rounded-[30px] bg-white shadow-md">
          <div className="relative h-48 w-full overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s5.png"
              alt="Codeavour"
              className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="w-full bg-blue-500 py-4 text-center">
            <h2 className="text-2xl font-bold text-white">Tech Tours</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiRoboticsPage;
