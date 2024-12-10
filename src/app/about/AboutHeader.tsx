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
          At Edueme, we are passionate about empowering the next generation of innovators, 
          thinkers, and problem-solvers through STEM education. Our mission is to inspire curiosity, 
          cultivate critical thinking, and equip learners with the skills they need to thrive in a rapidly evolving world.
            <br />
            <br />
            We specialize in delivering engaging, hands-on learning experiences that bridge the gap between theory 
            and real-world application in Science, Technology, Engineering, and Mathematics (STEM). Whether through workshops, 
            after-school programs, or tailored curriculum solutions, our goal is to spark a 
            love for STEM in learners of all ages and backgrounds.
            <br />
            <br />
            Our team comprises experienced educators, industry professionals, and subject-matter experts who are dedicated to fostering 
            creativity and building confidence in students. We believe that every learner deserves access to quality STEM education, 
            and we strive to create inclusive and supportive environments where they can explore their potential. 
            <br />
            <br />
            Join us in shaping a brighter future through the power of STEM!  
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
