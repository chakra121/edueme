"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if the current page is any test page where Navbar and Footer should not be shown
  const isTestPage =
    pathname === "/courses/roboticsCourse/2_3/mcqTest" ||
    pathname === "/courses/roboticsCourse/2_3/blanksTest";

const isDashboard =
     pathname === "/dashboard/studentDashboard/dhome" ||
     pathname === "/dashboard/studentDashboard/dprofile" ||
     pathname === "/dashboard/studentDashboard/denrolled"||
     pathname === "/dashboard/studentDashboard/dannounce"||
     pathname === "/dashboard/studentDashboard/dattend"||
     pathname === "/dashboard/studentDashboard/dhelp"||
     pathname === "/dashboard/studentDashboard/dupsessions"||
     
     pathname === "/dashboard/teacherDashboard/dhome"||
     pathname === "/dashboard/teacherDashboard/dprofile"||
     pathname === "/dashboard/teacherDashboard/dannounce"||
     pathname === "/dashboard/teacherDashboard/dcleardoubts"||
     pathname === "/dashboard/teacherDashboard/dcourseprogress"||
     pathname === "/dashboard/teacherDashboard/dclassdetails"||
     pathname === "/dashboard/teacherDashboard/dstudentanalysis";

  return (
    <div>
      {/* Only render Navbar and Footer if not on a test page */}
      {!isTestPage && <Navbar />}
      {children}
      {!isTestPage && !isDashboard && <Footer />}

    </div>
  );
}
