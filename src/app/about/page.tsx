import React from "react";

const About = () => {
  return (
    <div className=" ">
      {/* Container for the SVG waves positioned below the navbar */}
      <div className="absolute top-[4rem] z-50 ml-0 mr-0 w-full opacity-60">
        <div className="relative w-full">
          <svg
            className="h-[500px] w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 500"
          >
            <path
              fill="#f69c40"
              fillOpacity="1"
              d="M0,160L48,186.7C96,213,192,267,288,261.3C384,256,480,192,576,170.7C672,149,768,171,864,186.7C960,203,1056,213,1152,197.3C1248,181,1344,139,1392,117.3L1440,96L1440,500L1392,500C1344,500,1248,500,1152,500C1056,500,960,500,864,500C768,500,672,500,576,500C480,500,384,500,288,500C192,500,96,500,48,500L0,500Z"
              transform="scale(1, -1) translate(0, -530)"
            ></path>
          </svg>
          <svg
            className="absolute top-0 h-[500px] w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 500"
          >
            <path
              fill="#f97316"
              fillOpacity="1"
              d="M0,224L48,202.7C96,181,192,139,288,138.7C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,133.3C1248,160,1344,224,1392,256L1440,288L1440,500L1392,500C1344,500,1248,500,1152,500C1056,500,960,500,864,500C768,500,672,500,576,500C480,500,384,500,288,500C192,500,96,500,48,500L0,500Z"
              transform="scale(1, -1) translate(0, -380)"
            ></path>
          </svg>

          <svg
            className="absolute top-0 h-[500px] w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 500"
          >
            <path
              fill="#facc15"
              fillOpacity="1"
              d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,144C672,149,768,171,864,192C960,213,1056,235,1152,213.3C1248,192,1344,128,1392,96L1440,64L1440,500L1392,500C1344,500,1248,500,1152,500C1056,500,960,500,864,500C768,500,672,500,576,500C480,500,384,500,288,500C192,500,96,500,48,500L0,500Z"
              transform="scale(1, -1) translate(0, -320)"
            ></path>
          </svg>
        </div>
      </div>

      {/* Content sections */}
      <div className="relative z-50 flex items-center justify-center pt-[6rem]">
        <h1 className="mb-3 text-4xl font-bold">About Us</h1>
      </div>
      <div className="flex h-screen items-center justify-center">
        <div className="relative z-50 flex h-auto w-[60%] flex-col items-center justify-center rounded-2xl bg-amber-50 p-1 shadow-xl">
          <div className="relative z-50 flex-col items-center justify-center p-[3rem]">
            <h1 className="mb-2 text-center text-2xl font-semibold text-gray-800">
              Edueme Research Labs
            </h1>
            {/* First Para */}
            <p className="relative px-[2rem] pt-5 text-center text-base font-normal text-gray-800">
              The pace of technical development in the modern world is
              accelerating more quickly than before. Adaptation and the
              acquisition of new competencies and skills are crucial in this
              continuously chang ing world. All citizens—young and old—are
              impacted by the advancement of digital technology and the
              digitalization of society.
              <br />
              <br />
              Everyday life is greatly influenced by the use of mobile phones,
              laptops, tablets, and other technolo gies that serve both social
              and entertainment purposes. For everyone to be able to engage the
              digital generation in the educational process, they must learn to
              adapt to a changing world and build their digital competencies.
              <br />
              <br />
              Our future generation is now in need to learn about these machines
              to be future ready, same like in the past where Indian Schools
              between 1970 and 1990 used to have Occupational Courses for their
              students to be ready for 21st century.
              <br />
              <br />
              We at Edueme take extensive care of providing Work-Oriented
              learning opportunities to our students to make them ready for 2nd
              half of 21st century. Our team includes research scientists,
              innovators, Physicists, who has extensive knowledge and rich
              experience in the areas of Robotics, Mechanical Design, Machine
              Learning, Artificial Intelligence. We are the first in India to
              introduce component based robotics from 3rd standard.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="relative flex w-[70%] justify-between gap-6 p-2">
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
              30+<br/>Courses
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
