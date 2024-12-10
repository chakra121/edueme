import React from "react";

const AboutHeader = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">About Us</h1>
      <h2 className="text-center text-2xl font-semibold text-white mt-4">
        Edueme Research Labs
      </h2>
      <div className="flex flex-col lg:flex-row justify-center items-center mt-8 gap-8">
        {/* Left Image Card */}
        <div className="rounded-lg shadow-lg overflow-hidden">
          <img
            src="about bg.png"
            alt="About Banner"
            className="w-full h-auto"
            style={{ backgroundColor: "transparent" }}
          />
        </div>

        {/* Content Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-600 text-white rounded-lg p-6 shadow-lg max-w-3xl">
          <p className="text-white/70 leading-relaxed">
            The pace of technical development in the modern world is
            accelerating more quickly than before. Adaptation and the
            acquisition of new competencies and skills are crucial in this
            continuously changing world. All citizens—young and old—are impacted
            by the advancement of digital technology and the digitalization of
            society.
            <br />
            <br />
            Everyday life is greatly influenced by the use of mobile phones,
            laptops, tablets, and other technologies that serve both social and
            entertainment purposes. For everyone to be able to engage the
            digital generation in the educational process, they must learn to
            adapt to a changing world and build their digital competencies.
            <br />
            <br />
            Our future generation is now in need to learn about these machines
            to be future-ready, same like in the past where Indian Schools
            between 1970 and 1990 used to have Occupational Courses for their
            students to be ready for the 21st century.
            <br />
            <br />
            We at Edueme take extensive care of providing Work-Oriented
            learning opportunities to our students to make them ready for the
            2nd half of the 21st century. Our team includes research scientists,
            innovators, physicists, who have extensive knowledge and rich
            experience in the areas of Robotics, Mechanical Design, Machine
            Learning, Artificial Intelligence. We are the first in India to
            introduce component-based robotics from 3rd standard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
