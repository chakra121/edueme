"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  HomeIcon,
  UsersIcon,
  MegaphoneIcon,
  AcademicCapIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import classname from "classnames";

const TeacherSideBar = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Home",
      href: "/dashboard/teacherDashboard/dHome",
      icon: HomeIcon,
    },
    {
      label: "Course Catalog",
      href: "/dashboard/teacherDashboard/dCourseCatalog",
      icon: AcademicCapIcon,
    },
    {
      label: "Class Link",
      href: "/dashboard/teacherDashboard/dClassLink",
      icon: MegaphoneIcon,
    },
    {
      label: "Student Catalog",
      href: "/dashboard/teacherDashboard/dStudentCatalog",
      icon: UsersIcon,
    },
  ];
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-center text-lg font-bold text-base-content">
          Teacher Dashboard
        </h2>
      </div>
      <ul className="relative flex w-full flex-col space-y-5 font-semibold text-base-content">
        {links.map((link) => (
          <li key={link.href} className="static w-full">
            <Link
              className={classname({
                "btn flex w-full items-center justify-start rounded-md p-3 text-left text-base-content transition duration-300 ease-in-out hover:btn-primary hover:scale-105 hover:shadow-lg":
                  true,
                "btn btn-primary": currentPath === link.href,
                "border-none bg-base-100": currentPath !== link.href,
              })}
              href={link.href}
            >
              <link.icon className="mr-3 h-7 w-7" />
              <span className="flex-grow text-left">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto w-full">
        <button
          onClick={() => signOut()}
          className="btn btn-error flex w-full items-center justify-center space-x-2 transition duration-300 ease-in-out hover:scale-105"
        >
          <ArrowLeftOnRectangleIcon className="mr-1 h-6 w-6" />
          <span className="flex-grow text-left">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default TeacherSideBar;
