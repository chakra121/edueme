"use client";

import React from "react";

interface Teacher {
  id: string;
  teacherName: string;
  course: {
    courseCode: string;
  } | null;
}

interface Props {
  teachers: Teacher[];
  selected: string;
  onChange: (teacherId: string) => void;
}

const TeacherDropdown: React.FC<Props> = ({ teachers, selected, onChange }) => {
  return (
    <select
      className="select select-bordered w-full max-w-xs"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="none">None</option>
      {teachers.map((teacher) => (
        <option key={teacher.id} value={teacher.id}>
          {teacher.teacherName} (
          {teacher.course ? teacher.course.courseCode : "No Course"})
        </option>
      ))}
    </select>
  );
};

export default TeacherDropdown;
