"use client";
import React from "react";
import Link from "next/link";
import {
  HomeIcon,
  UserCircleIcon,
  MegaphoneIcon,
  ChartBarIcon,
  CalendarIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import classname from "classnames";

const StudentSideBar = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Home",
      href: "/dashboard/studentDashboard/dhome",
      icon: HomeIcon,
    },
    {
      label: "Profile",
      href: "/dashboard/studentDashboard/dprofile",
      icon: UserCircleIcon,
    },
    {
      label: "Enrolled Courses",
      href: "/dashboard/studentDashboard/denrolled",
      icon: AcademicCapIcon,
    },
    {
      label: "Announcements",
      href: "/dashboard/studentDashboard/dannounce",
      icon: MegaphoneIcon,
    },
    {
      label: "Upcoming Classes",
      href: "/dashboard/studentDashboard/dupsessions",
      icon: CalendarIcon,
    },
    {
      label: "Attendence",
      href: "/dashboard/studentDashboard/dattend",
      icon: ChartBarIcon,
    },
    {
      label: "Any Doubts?",
      href: "/dashboard/studentDashboard/dhelp",
      icon: QuestionMarkCircleIcon,
    },
  ];
return (
  <div className="space-y-4">
    <div className="flex flex-col items-center space-y-2">
      <div className="avatar">
        <div className="w-16 rounded-full ring ring-base-primary">
          <img
            className="object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-ucft4USNcEFqghK_s5NvcjRVJr_cfHN9w&s"
            alt="Teacher Avatar"
          />
        </div>
      </div>
      <h2 className="text-lg text-center font-bold text-base-content">
        Srichakra
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
  </div>
);
};

export default StudentSideBar;
