import Image from "next/image";
import React from "react";

const AboutHeader = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold">About Us</h1>
      <h2 className="mt-4 text-center text-2xl font-semibold text-white">
        Edueme Research Labs
      </h2>
      <div className="mt-8 flex flex-col items-center justify-center gap-8 lg:flex-row">
        {/* Left Image Card */}
        <div className="overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/about bg.png"
            alt="About Banner"
            className="h-auto w-full"
            style={{ backgroundColor: "transparent" }}
            width={500}
            height={300}
          />
        </div>

        {/* Content Card */}
        <div className="max-w-3xl rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 p-6 text-white shadow-lg">
          <p className="leading-relaxed text-white/70">
            At Edueme, we are passionate about empowering the next generation of
            innovators, thinkers, and problem-solvers through STEM education.
            Our mission is to inspire curiosity, cultivate critical thinking,
            and equip learners with the skills they need to thrive in a rapidly
            evolving world.
            <br />
            <br />
            We specialize in delivering engaging, hands-on learning experiences
            that bridge the gap between theory and real-world application in
            Science, Technology, Engineering, and Mathematics (STEM). Whether
            through workshops, after-school programs, or tailored curriculum
            solutions, our goal is to spark a love for STEM in learners of all
            ages and backgrounds.
            <br />
            <br />
            Our team comprises experienced educators, industry professionals,
            and subject-matter experts who are dedicated to fostering creativity
            and building confidence in students. We believe that every learner
            deserves access to quality STEM education, and we strive to create
            inclusive and supportive environments where they can explore their
            potential.
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
