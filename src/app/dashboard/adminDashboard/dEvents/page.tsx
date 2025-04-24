"use client";

import { useState } from "react";
import CreateEvent from "./CreateEvent";
import ViewEvents from "./ViewEvents";
import UpdateEvent from "./UpdateEvent";
import DeleteEvent from "./DeleteEvent";
import Toast from "./Toast"

export default function EventsPage() {
  const [toast, setToast] = useState({
    message: "",
    type: "success" as "success" | "error",
    isVisible: false,
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({
      message,
      type,
      isVisible: true,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        Upcoming Event Management
      </h1>

      <div role="tablist" className="tabs-border tabs mt-3">
        {/* Create Tab */}
        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Create"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <CreateEvent onToast={showToast} />
        </div>
        {/* View Tab */}
        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="View"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <ViewEvents />
        </div>

        {/* Update Tab */}
        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Update"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <UpdateEvent onToast={showToast} />
        </div>

        {/* Delete Tab */}
        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Delete"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <DeleteEvent onToast={showToast} />
        </div>
      </div>
      {/* <div className="tabs tabs-bordered mb-6">
        <button
          className={`tab-lg tab ${activeTab === "create" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("create")}
        >
          Create
        </button>
        <button
          className={`tab-lg tab ${activeTab === "view" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          View
        </button>
        <button
          className={`tab-lg tab ${activeTab === "update" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("update")}
        >
          Update
        </button>
        <button
          className={`tab-lg tab ${activeTab === "delete" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("delete")}
        >
          Delete
        </button>
      </div>

      <div className="rounded-lg bg-base-100 shadow-lg">
        {activeTab === "create" && <CreateEvent onToast={showToast} />}
        {activeTab === "view" && <ViewEvents />}
        {activeTab === "update" && <UpdateEvent onToast={showToast} />}
        {activeTab === "delete" && <DeleteEvent onToast={showToast} />}
      </div> */}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
