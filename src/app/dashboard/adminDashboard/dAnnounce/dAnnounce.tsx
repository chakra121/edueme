import updateCommonAnnounce from "@/app/actions/updateAnnounce";
import React from "react";
import prisma from "@/lib/connectPrisma";

const Announcement = (currentAnnouncement: any) => {
  
  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title p-3 text-3xl font-semibold text-base-content">
        Announcements
      </h1>

      <div role="tablist" className="tabs tabs-lifted mt-3">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Common"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-5 text-base-content"
        >
          <div className="flex flex-col space-y-5">
            {/* current Announcement box */}
            <div className="flex flex-col space-y-4 rounded-lg border-4 p-4">
              <h2 className="border-b pb-2 text-xl font-semibold">
                Present Announcement
              </h2>
              <h1 className="text-2xl font-semibold">{}</h1>
              <p className="text-lg text-base-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur nemo iusto rerum quam voluptas dolores tempora,
                consequuntur aperiam officia hic labore veritatis quae neque
                volupt ate, debitis enim inventore aspernatur exercitationem?
              </p>
              <div className="flex items-center space-x-3 border-t pt-2">
                <label className="text-base font-semibold text-slate-500">
                  Last Updated on:
                </label>
                <p className="text-base">Date and time</p>
              </div>
            </div>
            {/* update box */}
            <form action={updateCommonAnnounce} className="flex flex-col space-y-4 rounded-lg border-4 p-4">
              <h2 className="border-b pb-2 text-xl font-semibold">
                Update the Announcement
              </h2>
              <label
                className="block text-lg font-medium text-base-content"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="input input-bordered w-full"
                placeholder="Enter title"
              />
              <label
                className="block text-lg font-medium text-base-content"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Enter description"
              ></textarea>
              <div>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-lg font-medium text-base-content"
          aria-label="Student"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 p-6 text-base-content"
        >
          Tab content 2
        </div>
      </div>
    </div>
  );
}
async function getCuurentAnnouncement() {
  const currentAnnouncement = await prisma.adminAnnouncement.findUnique({
    where: {
      id: "67a9d9e0464d7d6136fa3928",
    },
    select: {
      title: true,
      description: true,
      date: true,
    },
  });

      currentAnnouncement
}

export default Announcement;