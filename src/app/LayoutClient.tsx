"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

const HIDDEN_BOTH_PATHS = [
  "/unauthorized",
];

const HIDDEN_FOOTER_PATHS = [
  "/dashboard/studentDashboard",
  "/dashboard/teacherDashboard",
  "/dashboard/adminDashboard",
  "/auth/signup",
  "/auth/login",
  "/courses" // This will hide footer for all course related pages
];

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  // Loader and path checks
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1500);

    return () => {
      clearTimeout(timer);
      setIsLoading(false);
    };
  }, [pathname]);

  const shouldHideNavbar = HIDDEN_BOTH_PATHS.some((path) =>
    pathname?.startsWith(path),
  );

  const shouldHideFooter =
    HIDDEN_FOOTER_PATHS.some((path) => pathname?.startsWith(path)) ||
    HIDDEN_BOTH_PATHS.some((path) => pathname?.startsWith(path));

  return (
    <div className="flex min-h-screen flex-col">
      <PageLoader visible={isLoading} />

      {/* Navbar conditional rendering */}
      {!shouldHideNavbar && <Navbar />}

      {/* Main content area */}
      <main
        className={`flex-1 ${shouldHideFooter ? "h-[calc(100vh-4rem)]" : ""}`}
      >
        {!isLoading && children}
      </main>

      {/* Footer conditional rendering */}
      {!shouldHideFooter && <Footer />}
    </div>
  );
}
