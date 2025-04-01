"use client";

import { useState } from "react";
import { FaDownload } from "react-icons/fa6";

export default function DownloadStudents() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportToExcel = async () => {
    try {
      setIsExporting(true);

      const response = await fetch("/api/export-students", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to export students");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "students-list.xlsx";
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download student list. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="card border-2 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Student Records</h2>
        <p>Export all student data to Excel spreadsheet</p>
        <div className="card-actions mt-2 justify-end">
          <button
            onClick={handleExportToExcel}
            className={`btn ${isExporting ? "btn-disabled" : "btn-primary"} flex items-center gap-2`}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Exporting...
              </>
            ) : (
              <>
                <FaDownload className="h-4 w-4" />
                Export Students
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
