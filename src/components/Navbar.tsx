"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import classname from "classnames";

const Navbar = () => {
  const { data: session } = useSession();
  const currentPath = usePathname();


  // Determine the dashboard link based on user role
  const dashboardLink =
    session?.user?.role === "teacher"
      ? "/dashboard/teacherDashboard/dHome"
      : session?.user?.role === "superadmin"
        ? "/dashboard/adminDashboard/dAnnounce"
        : "/dashboard/studentDashboard/dHome";

  // List of public navigation links
  const links = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Events", href: "/allevents" },
    {label: "Gallery", href: "/gallery"},
    { label: "Research", href: "/research" },
    { label: "Why Us", href: "/whyus" },
    {label: "Blogs", href: "/blogs"},
  ];

  // Check if the user is on a student or teacher dashboard
  const isStudentOrTeacherDashboard =
    currentPath.startsWith("/dashboard/studentDashboard") ||
    currentPath.startsWith("/dashboard/teacherDashboard");

  return (
    <div
      className={`navbar fixed z-99 mb-4 flex h-16 w-full items-center justify-between px-5 py-[0.5rem] ${isStudentOrTeacherDashboard ? "bg-transparent" : "bg-base-100 shadow-md"}`}
    >
      {isStudentOrTeacherDashboard ? (
        <div className="flex w-full justify-center">
          <Link href="/">
            <Image
              className="h-14 w-auto transition duration-300 ease-in-out hover:scale-105"
              width={300}
              height={300}
              src="/logo_white.png"
              alt="logo"
            />
          </Link>
        </div>
      ) : (
        <>
          <Link href="/">
            <Image
              className="h-14 w-auto transition duration-300 ease-in-out hover:scale-105"
              width={300}
              height={300}
              src="/logo_black.png"
              alt="logo"
            />
          </Link>

          <div className="hidden items-center space-x-4 lg:flex">
            <ul className="flex items-center space-x-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  className={classname({
                    "text-base-content rounded-md px-[1rem] py-2 transition duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 hover:text-black":
                      true,
                    "text-yellow-500": currentPath === link.href,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </ul>
            <div>
              {session ? (
                <div className="flex gap-4">
                  <Link href={dashboardLink}>
                    <button className="btn btn-outline transition duration-300 ease-in-out hover:scale-105">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="btn btn-error btn-md transition duration-300 ease-in-out hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link href="/auth/login">
                    <button className="btn btn-primary btn-md transition duration-300 ease-in-out hover:scale-105">
                      Login
                    </button>
                  </Link>
                  <Link href="/auth/signup">
                    <button className="btn btn-secondary btn-md transition duration-300 ease-in-out hover:scale-105">
                      Signup
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
