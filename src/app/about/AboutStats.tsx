import React from "react";
import { UserGroupIcon, AcademicCapIcon, BuildingLibraryIcon, BookOpenIcon } from "@heroicons/react/24/outline";

const AboutStats = () => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-center px-4 lg:px-16">
        <div className="flex flex-col justify-between gap-6 p-2 lg:flex-row">
          {/* Students Card */}
          <div className="relative z-50 flex h-64 w-64 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 to-yellow-300 p-4 transition-transform duration-200 hover:scale-110 hover:shadow-lg">
            <UserGroupIcon className="h-16 w-16 text-gray-800 mb-4" />
            <h1 className="text-center text-2xl font-semibold text-gray-800">
              75+
              <br />
              Students
              <br />
              Enrolled
            </h1>
          </div>

          {/* Teachers Card */}
          <div className="relative z-50 flex h-64 w-64 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 to-yellow-300 p-4 transition-transform duration-200 hover:scale-110 hover:shadow-lg">
            <AcademicCapIcon className="h-16 w-16 text-gray-800 mb-4" />
            <h1 className="text-center text-2xl font-semibold text-gray-800">
              100+
              <br />
              Teachers
            </h1>
          </div>

          {/* Schools Card */}
          <div className="relative z-50 flex h-64 w-64 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 to-yellow-300 p-4 transition-transform duration-200 hover:scale-110 hover:shadow-lg">
            <BuildingLibraryIcon className="h-16 w-16 text-gray-800 mb-4" />
            <h1 className="text-center text-2xl font-semibold text-gray-800">
              50+
              <br />
              Schools
              <br />
              Registered
            </h1>
          </div>

          {/* Courses Card */}
          <div className="relative z-50 flex h-64 w-64 flex-col items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 to-yellow-300 p-4 transition-transform duration-200 hover:scale-110 hover:shadow-lg">
            <BookOpenIcon className="h-16 w-16 text-gray-800 mb-4" />
            <h1 className="text-center text-2xl font-semibold text-gray-800">
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

export default AboutStats;
