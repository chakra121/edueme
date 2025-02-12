"use client";
import React from "react";
import Link from "next/link";
import {
  UsersIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import classname from "classnames";

const AdminSideBar = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Announcements",
      href: "/dashboard/adminDashboard/dAnnounce",
      icon: MegaphoneIcon,
    },
    {
      label: "Teacher's Catalog",
      href: "/dashboard/adminDashboard/dTeacherCatalog",
      icon: UsersIcon,
    },
  ];
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <h2 className="text-center text-lg font-bold text-base-content">
          Admin Dashboard
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

export default AdminSideBar;
