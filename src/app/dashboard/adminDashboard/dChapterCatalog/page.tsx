import React from 'react'

const ManageChapters = () => {
  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        Manage Chapters
      </h1>

      <div role="tablist" className="tabs-boxed tabs mt-3">
        <input
          type="radio"
          name="my_tabs_3"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Create"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        ></div>

        <input
          type="radio"
          name="my_tabs_3"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="View"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        ></div>

        <input
          type="radio"
          name="my_tabs_3"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Delete"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        ></div>

        <input
          type="radio"
          name="my_tabs_3"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Update"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        ></div>
      </div>
    </div>
  );
}

export default ManageChapters;