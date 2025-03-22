"use client";

import React from "react";
import AssignTeacherTable from "./assignTeacherTable";

const AssignTeacher = () => {
  return (
    <div className="card card-normal bg-base-100">
      <div className="card-body">
        <h1 className="mb-4 text-2xl font-bold">Assign Teacher to Students</h1>
        <AssignTeacherTable />

        {/* Toast Container */}
        <div
          id="toast-container"
          className="toast toast-end toast-bottom"
        ></div>
      </div>
    </div>
  );
};

export default AssignTeacher;
