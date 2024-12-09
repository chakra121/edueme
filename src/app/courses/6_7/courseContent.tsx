"use client";

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
      "1.2 : Parts of a Robot",
      "1.3 : How Robots Work",
      "1.4 : Uses of Robotics",
      "1.5 : Types of Robots",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: ["Unboxing Astra Kit"],
      },
      {
        subheading: "Abhyas",
        details: ["Identify the components in the Astra Kit"],
      },
    ],
  },
  {
    title: "Chapter 2 : Basic Electronic Components and Sensors",
    content: [
      "2.1 : Introduction to electronic components",
      "2.2 : Basic electronic components",
      "2.3 : Electronic devices",
      "2.4 : Introduction to sensors",
      "2.5 : Types of sensors",
      "2.6 : Applications of Electronic Components and Sensors",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: [
          "Basic circuit",
          "Different types of circuit (Series and Parallel)",
        ],
      },
      {
        subheading: "Abhyas",
        details: ["Fill in the Blanks/Matching"],
      },
    ],
  },
  {
    title: "Chapter 3 : Introduction to TinkerCad",
    content: [
      "3.1 : Getting Started with TinkerCad",
      "3.2 : Basics of Circuit Simulation",
      "3.3 Login to TinkerCad",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: [
          "Open Tinkercad in browser",
          "Problems with TinkerCad with (Basic circuit with different batteries)",
        ],
      },
      {
        subheading: "Abhyas",
        details: ["Choose the Correct Answers"],
      },
    ],
  },
  {
    title: "Chapter 4 : Introduction to Arduino",
    content: [
      "4.1 : What is an arduino?",
      "4.2 : Types of arduino",
      "4.3 : Parts of arduino",
      "4.4 : Uses of arduino with realtime examples",
      "4.5 : Installation of IDE Software",
    ],
    subsections: [
      {
        subheading: "Prayog",
        details: [
          "Activity installing arduino IDE",
          "Connecting an arduino to a computer",
        ],
      },
      {
        subheading: "Abhyas",
        details: ["Exercises on Arduino overview"],
      },
    ],
  },
  {
    title: "Chapter 5 : Sensors - We sense the world",
    content: ["We are working on it"],
    subsections: [
      {
        subheading: "Prayog",
        details: [],
      },
      {
        subheading: "Abhyas",
        details: [],
      },
    ],
  },
  {
    title:
      "Chapter 6 : M-Block a world of block programming / Creative coding software",
    content: ["We are working on it"],
    subsections: [
      {
        subheading: "Prayog",
        details: [],
      },
      {
        subheading: "Abhyas",
        details: [],
      },
    ],
  },
  {
    title: "Chapter 7 : Robot Design and Construction",
    content: ["We are working on it"],
    subsections: [
      {
        subheading: "Prayog",
        details: [],
      },
      {
        subheading: "Abhyas",
        details: [],
      },
    ],
  },
  {
    title: "Chapter 8 : IoT (Internet of Things)",
    content: ["We are working on it"],
    subsections: [
      {
        subheading: "Prayog",
        details: [],
      },
      {
        subheading: "Abhyas",
        details: [],
      },
    ],
  },
  {
    title: "Chapter 9 : Projects",
    content: ["We are working on it"],
    subsections: [
      {
        subheading: "Prayog",
        details: [],
      },
      {
        subheading: "Abhyas",
        details: [],
      },
    ],
  },
  {
    title: "Chapter 10 : Ethics and Social Implications of Robotics",
    content: ["We are working on it"],
    subsections: [
      {
        subheading: "Prayog",
        details: [],
      },
      {
        subheading: "Abhyas",
        details: [],
      },
    ],
  },
  {
    title: "Chapter 11 : Summary",
    content: ["We are working on it"],
    subsections: [
      {
        subheading: "Prayog",
        details: [],
      },
      {
        subheading: "Abhyas",
        details: [],
      },
    ],
  },
];


  return (
      <div className="ml-10 max-w-4xl bg-black p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Course Content</h2>
          <button
            onClick={toggleAll}
            className="text-purple-400 hover:underline"
          >
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
              className="flex w-full items-center justify-between bg-gray-800 p-4 text-left text-white focus:outline-none"
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
              <div className="bg-gray-900 p-4 font-sans text-gray-300">
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
      </div>
  );
};

export default CourseContent;
