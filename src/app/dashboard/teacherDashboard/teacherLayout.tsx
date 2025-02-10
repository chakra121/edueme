import TeacherSideBar from "./sideBar";
import { FC, ReactNode } from "react";

interface TeacherLayoutProps {
  children: ReactNode;
}
const TeacherLayout: FC<TeacherLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="rounded-md p-6">
        <aside className="card fixed w-64 bg-base-100 p-4">
          <TeacherSideBar />
        </aside>
        {children}
      </div>
    </>
  );
};

export default TeacherLayout;
