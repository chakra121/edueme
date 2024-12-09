import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center py-[6rem]">
      <h1 className="text-4xl font-bold">About Us</h1>

      <h1 className="text-center text-2xl font-semibold text-white">
        Edueme Research Labs
      </h1>
      {/* First Para */}
      <p className="text-balance lg:text-center text-white/70 px-[1rem] lg:px-[20%]">
        The pace of technical development in the modern world is accelerating
        more quickly than before. Adaptation and the acquisition of new
        competencies and skills are crucial in this continuously chang ing
        world. All citizens—young and old—are impacted by the advancement of
        digital technology and the digitalization of society.
        <br />
        <br />
        Everyday life is greatly influenced by the use of mobile phones,
        laptops, tablets, and other technolo gies that serve both social and
        entertainment purposes. For everyone to be able to engage the digital
        generation in the educational process, they must learn to adapt to a
        changing world and build their digital competencies.
        <br />
        <br />
        Our future generation is now in need to learn about these machines to be
        future ready, same like in the past where Indian Schools between 1970
        and 1990 used to have Occupational Courses for their students to be
        ready for 21st century.
        <br />
        <br />
        We at Edueme take extensive care of providing Work-Oriented learning
        opportunities to our students to make them ready for 2nd half of 21st
        century. Our team includes research scientists, innovators, Physicists,
        who has extensive knowledge and rich experience in the areas of
        Robotics, Mechanical Design, Machine Learning, Artificial Intelligence.
        We are the first in India to introduce component based robotics from 3rd
        standard.
      </p>
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-between gap-6 p-2 lg:flex-row">
          <div className="relative z-50 flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-200 p-1 transition-transform duration-200 hover:scale-110 hover:shadow-lg">
            <h1 className="mb-2 text-left text-2xl font-semibold text-gray-800">
              75+
              <br />
              Students
              <br />
              Enrolled
            </h1>
          </div>

          <div className="relative z-50 flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-200 p-1 transition-transform duration-200 hover:scale-110 hover:shadow-lg">
            <h1 className="mb-2 text-left text-2xl font-semibold text-gray-800">
              100+
              <br />
              Teachers
            </h1>
          </div>

          <div className="relative z-50 flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-200 p-1 transition-transform duration-200 hover:scale-110 hover:shadow-lg">
            <h1 className="mb-2 text-left text-2xl font-semibold text-gray-800">
              50+
              <br />
              Schools
              <br />
              Registered
            </h1>
          </div>

          <div className="relative z-50 flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-yellow-200 p-1 transition-transform duration-200 hover:scale-110 hover:shadow-lg">
            <h1 className="mb-2 text-left text-2xl font-semibold text-gray-800">
              30+
              <br />
              Courses
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
