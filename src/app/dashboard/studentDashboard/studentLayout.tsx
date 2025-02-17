import { FC, ReactNode } from "react";
import StudentSideBar from "./sideBar";

interface StudentLayoutProps {
  children: ReactNode;
}
const StudentLayout: FC<StudentLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="rounded-md mt-10 p-6">
        <aside className="card fixed w-64 bg-base-100 p-4">
          <StudentSideBar />
        </aside>
        {children}
      </div>
    </>
  );
};

export default StudentLayout;
