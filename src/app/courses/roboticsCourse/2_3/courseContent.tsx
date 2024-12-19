"use client";

import Link from "next/link";
import { useState } from "react";

interface Subsection {
  subheading: string;
  details: string[]; // Array of content under the subheading
}

interface CourseSection {
  title: string;
  content: string[];
  subsections?: Subsection[]; // Optional subsections
}

const CourseContent: React.FC = () => {
  const [expandedAll, setExpandedAll] = useState(false);
  const [expanded, setExpanded] = useState<boolean[]>(
    Array(5).fill(false), // Adjust the size based on the number of dropdowns
  );

  const toggleAll = () => {
    const newState = !expandedAll;
    setExpandedAll(newState);
    setExpanded(expanded.map(() => newState));
  };

  const toggleDropdown = (index: number) => {
    const updatedExpanded = [...expanded];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpanded(updatedExpanded);
  };

const courseSections: CourseSection[] = [
  {
    title: "Chapter 1 : Introduction to Robotics",
    content: [
      "1.1 : What is Robotics",
      "1.2 : How Robots Work",
      "1.3 : Uses of robotics",
      "1.4 : Types of robots",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: ["1 : Unboxing Astra Kit"],
      },
      {
        subheading: "Abhyas",
        details: ["1 : Identify the components in the Astra Kit"],
      },
    ],
  },
  {
    title: "Chapter 2 : Basic Electronic Components",
    content: [
      "2.1 : Introduction to electronic components",
      "2.2 : Basic electronic components",
      "2.3 : Daily life uses ",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: [
          "1 : Basic circuit",
          "2 : Different types of circuit (Series and Parallel)",
        ],
      },
      {
        subheading: "Abhyas",
        details: ["Name the components Fill in the blanks/Matching"],
      },
    ],
  },
  {
    title: "Chapter 3 : Sensors - we sense the world",
    content: [
      "3.1 : What is a sensor?",
      "3.2 : Types of sensors",
      "3.3 : Applications of sensors",
      "3.4 : Future of sensors",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: [
          "1 : Blinking of LED using IR sensor",
          "2 : Buzzer using IR sensor",
          "3 : Distance calculation using ultrasonic sensor",
          "4 : IR sensor controlled servo motor",
          "5 : LDR Controlled Servo Motor",
          "6 : Test for conductance",
        ],
      },
      {
        subheading: "Abhyas",
        details: [
          "1 : Choose the Correct Answers",
          "2 : Match the following",
          "3 : Fill in the blanks",
        ],
      },
    ],
  },
  {
    title: "Chapter 4 : Introduction to tinker cad",
    content: [
      "4.1 : Simulation software intro",
      "4.2 : Why do we use tinkercad",
      "4.3 : Login to Tinker CAD",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: [
          "1 : open Tinkercad in browser",
          "2 : Problems with tinkercad with (basic circuit with different batteries)",
        ],
      },
      {
        subheading: "Abhyas",
        details: ["1 : Choose the correct answers"],
      },
    ],
  },
  {
    title: "Chapter 5 : Introduction to Arduino",
    content: [
      "5.1 : What is an arduino",
      "5.2 : Types of arduino",
      "5.3 : Parts of Arduino",
      "5.4 : Uses of Arduino with realtime examples",
      "5.5 : Installation of ide software",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: [
          "1 : Activity installing arduino IDE",
          "2 : How to connect arduino to a computer",
        ],
      },
      {
        subheading: "Abhyas",
        details: ["1 : Exercises on Arduino overview"],
      },
    ],
  },
  {
    title:
      "Chapter 6 : M-Block a world of block programming / Creative coding software",
    content: [
      "6.1 : Introduction to Block coding",
      "6.2 : M - Block APP ",
      "6.3 : Key features of M - Block",
      "6.4 : Uses of M block",
      "6.5 : Process to install M - Block",
      "6.6 : Get started with M - Block (Your first code!)",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: ["1 : Create a block code"],
      },
      {
        subheading: "Abhyas",
        details: ["Working..."],
      },
    ],
  },
  {
    title: "Chapter 7 : Robot Design and Construction",
    content: [
      "7.1 : Basics of Robotics",
      "7.2 : Choose a Simple Robot Kit or Platform",
      "7.3 : Basic Components for Building a Simple Robot",
      "7.4 : Assemble the Robot",
      "7.5 : Programming the robot",
      "7.6 : Testing the robot",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: ["Working..."],
      },
      {
        subheading: "Abhyas",
        details: ["Working..."],
      },
    ],
  },
  {
    title: "Chapter 8 : IoT (Internet of Things)",
    content: ["Working..."],
    subsections: [
      {
        subheading: "Prayog",
        details: ["Working..."],
      },
      {
        subheading: "Abhyas",
        details: ["Working..."],
      },
    ],
  },
  {
    title: "Chapter 9 : Projects",
    content: ["Working..."],
    subsections: [
      {
        subheading: "Prayog",
        details: ["Working..."],
      },
      {
        subheading: "Abhyas",
        details: ["Working..."],
      },
    ],
  },
  {
    title: "Chapter 10 : Ethics and Social Implications of Robotics",
    content: ["Working..."],
    subsections: [
      {
        subheading: "Prayog",
        details: ["Working..."],
      },
      {
        subheading: "Abhyas",
        details: ["Working..."],
      },
    ],
  },
  {
    title: "Chapter 11 : Summary",
    content: ["Working..."],
    subsections: [
      {
        subheading: "Prayog",
        details: ["Working..."],
      },
      {
        subheading: "Abhyas",
        details: ["Working..."],
      },
    ],
  },
];


  return (
    <div className="max-w-4xl bg-black p-6 pl-8 md:m-0 lg:ml-16">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Course Content</h2>
        <button onClick={toggleAll} className="text-purple-400 hover:underline">
          {expandedAll ? "Collapse all sections" : "Expand all sections"}
        </button>
      </div>
      <p className="mb-4 text-gray-400">
        {courseSections.length} Sections •{" "}
        {courseSections.reduce(
          (sum, section) => sum + section.content.length,
          0,
        )}{" "}
        Lectures
      </p>
      {courseSections.map((section, index) => (
        <div key={index} className="mb-2 rounded-lg border border-gray-700">
          {/* Dropdown Button */}
          <button
            onClick={() => toggleDropdown(index)}
            className="flex w-full items-center justify-between rounded-lg bg-gray-800 p-4 text-left text-white focus:outline-none"
          >
            <span className="font-semibold">{section.title}</span>
            <svg
              className={`h-5 w-5 transform ${
                expanded[index] ? "rotate-180" : "rotate-0"
              } transition-transform`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Content */}
          {expanded[index] && (
            <div className="rounded-b-lg bg-gray-900 p-4 font-sans text-gray-300">
              <ul className="mb-4 pl-5 text-lg">
                {section.content.map((item, i) => (
                  <li key={i} className="mb-2">
                    {item}
                  </li>
                ))}
              </ul>
              {/* Subsections */}
              {section.subsections && (
                <div className="mt-4">
                  {section.subsections.map((sub, i) => (
                    <div key={i} className="mb-4 text-base">
                      <h4 className="text-lg font-semibold text-fuchsia-400">
                        {sub.subheading}
                      </h4>
                      <ul className="pl-5 text-lg text-gray-300">
                        {sub.details.map((detail, j) => (
                          <li key={j} className="mb-2">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <div className="mt-2 flex items-center space-x-5 justify-center">
        <Link
          href="./2_3/mcqTest"
          className="mt-2 rounded-lg bg-violet-500 p-4 text-sm"
        >
          Take a demo Quiz Test
        </Link>
        <Link
          href="./2_3/blanksTest"
          className="mt-2 rounded-lg bg-violet-500 p-4 text-sm"
        >
          Take a demo Blanks Test
        </Link>
      </div>
    </div>
  );
};

export default CourseContent;
