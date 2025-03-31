"use client";

import React, { useState } from "react";
import { getClassLink } from "@/app/actions/getClassLink";
import { format } from "date-fns";

interface ClassLink {
  classLink: string;
  topics: string[];
  description: string;
  DateAndTime: Date | string; // Accept both Date and string
}

const DLiveClass = () => {
  const [classData, setClassData] = useState<ClassLink | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format date for display
  const formatDateTime = (dateString: Date | string) => {
    try {
      const date =
        typeof dateString === "string" ? new Date(dateString) : dateString;
      return format(date, "MMMM dd, yyyy hh:mm aa");
    } catch {
      return "Invalid date";
    }
  };

  const fetchClassData = async () => {
    setLoading(true);
    setError(null);

    const result = await getClassLink(); // Fetch data

    // Ensure the loading state lasts at least 3 seconds
    setTimeout(() => {
      if ("error" in result) {
        setError(result.error ?? "An unknown error occurred");
        setClassData(null);
      } else {
        setClassData(result.classLink);
      }
      setLoading(false);
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="card bg-base-100 p-4">
      <div className="card-body">
        <h2 className="card-title mb-5 text-3xl font-bold text-primary">
          Live Class Details
        </h2>

        {loading ? (
          <div className="flex w-52 flex-col gap-4 space-y-3">
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ) : error ? (
          <p className="mb-2 text-lg text-red-500">{error}</p>
        ) : classData ? (
          <div>
            <h1 className="mb-2 text-2xl font-semibold">Topics:</h1>
            <ul className="mb-4 list-decimal pl-10 text-lg">
              {classData.topics.map((topic, i) => (
                <li className="mb-1" key={i}>
                  {topic}
                </li>
              ))}
            </ul>
            <h1 className="mb-2 text-2xl font-semibold">Description:</h1>
            <p className="mb-4 pl-6 text-lg">{classData.description}</p>
            <h1 className="mb-2 text-2xl font-semibold">
              Date and Time:
            </h1>
            <p className="mb-4 pl-6 text-lg">
              {formatDateTime(classData.DateAndTime)}
            </p>
            <a
              href={classData.classLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-4"
            >
              Join Class
            </a>
          </div>
        ) : (
          <p className="mb-2 text-lg">
            Click the button below to get the class details
          </p>
        )}

        <button onClick={fetchClassData} className="btn btn-secondary mt-4">
          Refresh Class Details
        </button>
      </div>
    </div>
  );
};

export default DLiveClass;
