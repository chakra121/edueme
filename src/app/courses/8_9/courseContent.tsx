"use client";

import { useState } from "react";

interface CourseSection {
  title: string;
  content: string[];
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
      title: "Chapter : 1 : Advanced Robotics and Automation",
      content: [
        "1.1 : What is Robot?",
        "1.2 : Uses of robot in various areas",
        "1.3 : Anatomy of Robot",
        "1.4 : Applications of Robots",
        "1.5 : Understand different kinds of Robots",
      ],
    },
    {
      title: "Chapter : 2 : Basic Electronic Components and Sensors",
      content: [
        "2.1 : Introduction to Sensors",
        "2.2 : Understanding Circuits",
        "2.3 : How to connect sensors",
      ],
    },
    {
      title: "3. Introduction to TinkerCad",
      content: [
        "3.1 : Getting Started with TinkerCad",
        "3.2 : Basics of Circuit Simulation",
      ],
    },
    {
      title: "4. Introduction to Arduino",
      content: [
        "4.1 : Setting up Arduino",
        "4.2 : Writing your first program",
        "4.3 : Uploading code to Arduino",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl bg-black p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Course Content</h2>
        <button onClick={toggleAll} className="text-purple-400 hover:underline">
          {expandedAll ? "Collapse all sections" : "Expand all sections"}
        </button>
      </div>
      <p className="mb-4 text-gray-400">
        {courseSections.length} sections •{" "}
        {courseSections.reduce(
          (sum, section) => sum + section.content.length,
          0,
        )}{" "}
        lectures • Estimated total length
      </p>
      {courseSections.map((section, index) => (
        <div key={index} className="mb-2 rounded-lg border border-gray-700">
          {/* Dropdown Button */}
          <button
            onClick={() => toggleDropdown(index)}
            className="flex w-full items-center rounded-lg justify-between bg-gray-800 p-4 text-left text-white focus:outline-none"
          >
            <span className="font-medium">{section.title}</span>
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
            <div className="bg-gray-900 p-4 text-gray-300">
              <ul>
                {section.content.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContent;
