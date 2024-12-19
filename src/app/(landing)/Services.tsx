import React from "react";

const AiRoboticsPage: React.FC = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center px-6 py-10">
      {/* Title Section */}
      <div className="text-center text-white mb-10">
        <h1 className="text-4xl font-bold mb-4">Services by Edueme</h1>
        <p className="max-w-2xl text-lg text-center">
          Edueme provides educators and students with the tools to cultivate coding
          and problem-solving skills, enabling them to engineer their future.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
        {/* Card 1 */}
        <div className="relative bg-white rounded-[30px] shadow-md overflow-hidden flex flex-col items-center group">
          <div className="relative w-full h-48 overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s1.jpeg"
              alt="Educational Kits"
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
          </div>
          <div className="bg-blue-500 text-center py-4 w-full">
            <h2 className="text-2xl font-bold text-white">Educational Kits</h2>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative bg-white rounded-[30px] shadow-md overflow-hidden flex flex-col items-center group">
          <div className="relative w-full h-48 overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s2.jpeg"
              alt="PictoBlox"
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
          </div>
          <div className="bg-blue-500 text-center py-4 w-full">
            <h2 className="text-2xl font-bold text-white">PictoBlox</h2>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative bg-white rounded-[30px] shadow-md overflow-hidden flex flex-col items-center group">
          <div className="relative w-full h-48 overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s3.jpeg"
              alt="Curriculum"
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
          </div>
          <div className="bg-blue-500 text-center py-4 w-full">
            <h2 className="text-2xl font-bold text-white">Curriculum</h2>
          </div>
        </div>

        {/* Card 4 */}
        <div className="relative bg-white rounded-[30px] shadow-md overflow-hidden flex flex-col items-center group">
          <div className="relative w-full h-48 overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s4.jpeg"
              alt="Teacher Development Program"
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
          </div>
          <div className="bg-blue-500 text-center py-4 w-full">
            <h2 className="text-2xl font-bold text-white">
              Teacher Development Program
            </h2>
          </div>
        </div>

        {/* Card 5 */}
        <div className="relative bg-white rounded-[30px] shadow-md overflow-hidden flex flex-col items-center group">
          <div className="relative w-full h-48 overflow-hidden rounded-t-[30px]">
            <img
              src="/servic/s5.png"
              alt="Codeavour"
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
          </div>
          <div className="bg-blue-500 text-center py-4 w-full">
            <h2 className="text-2xl font-bold text-white">Codeavour</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiRoboticsPage;
