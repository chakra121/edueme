import { FC, ReactNode } from "react";

interface StudentLayoutProps {
  children: ReactNode;
}
const StudentLayout: FC<StudentLayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        {children}
      </div>
    </>
  );
};

export default StudentLayout;
