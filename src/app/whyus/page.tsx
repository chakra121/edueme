'use client';

import Image from "next/image";

const WhyUs = () => {
  return (
    <div className="flex flex-col items-center py-[6rem] text-white bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <h1 className="text-5xl font-bold text-center">Why Choose Us?</h1>
      <p className="mt-4 text-lg text-center text-gray-300 max-w-2xl">
        We inspire young minds with hands-on robotics education, blending interactive learning with real-world applications. Join us in shaping the future of technology.
      </p>
      
      <div className="mt-12 flex flex-col lg:flex-row items-center gap-12">
        {/* GIF Section */}
        <div className="w-[400px] h-[400px] relative">
          <Image src="/info1.gif" alt="Information" width={400} height={400} />
        </div>
        
        {/* Information Section */}
        <div className="max-w-xl">
          <ul className="space-y-6 text-lg">
            <li className="flex items-center gap-4">
              <span className="text-yellow-400 text-3xl">📘</span>
              Hands-on Learning with Real Robotics Kits
            </li>
            <li className="flex items-center gap-4">
              <span className="text-blue-400 text-3xl">🤖</span>
              AI & Automation Integrated Curriculum
            </li>
            <li className="flex items-center gap-4">
              <span className="text-green-400 text-3xl">🚀</span>
              Industry Expert Mentorship & Guidance
            </li>
            <li className="flex items-center gap-4">
              <span className="text-red-400 text-3xl">🎓</span>
              Certifications & Future Career Support
            </li>
          </ul>
        </div>
      </div>
      
      {/* National Education Policy Section */}
      <div className="mt-16 px-6 max-w-4xl text-center">
        <h2 className="text-4xl font-bold text-yellow-400">National Education Policy (NEP)</h2>
        <p className="mt-4 text-lg text-gray-300">
          The National Education Policy (NEP) aims to transform the educational landscape by promoting holistic and multidisciplinary learning. It emphasizes flexibility in curriculum, integration of vocational education, and the use of technology to enhance learning outcomes.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-white">Flexible Curriculum</h3>
            <p className="mt-2 text-gray-300">NEP introduces a multidisciplinary approach, allowing students to choose subjects across streams.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-white">Skill Development</h3>
            <p className="mt-2 text-gray-300">It integrates vocational education and real-world skills to make students industry-ready.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-white">Technology in Education</h3>
            <p className="mt-2 text-gray-300">Encourages digital learning and modern teaching techniques to enhance educational outcomes.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-semibold text-white">Inclusive Education</h3>
            <p className="mt-2 text-gray-300">Focuses on equitable access to quality education for all, including disadvantaged groups.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;