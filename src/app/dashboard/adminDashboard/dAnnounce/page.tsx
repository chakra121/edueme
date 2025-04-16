import {
  updateCommonAnnouncement,
  updateStudentAnnouncement,
} from "@/app/actions/updateAnnounce";
import prisma from "@/lib/globalPrisma";

export default async function dAnnouncePage() {
  let currentCommonAnnouncement = null;
  let currentStudentAnnouncement = null;

  try {
    await prisma.$connect(); // Ensure DB connection before querying

    currentCommonAnnouncement = await prisma.adminAnnouncement.findFirst({
      where: { role: "common" },
      select: { title: true, description: true, date: true, id: true },
    });

    currentStudentAnnouncement = await prisma.adminAnnouncement.findFirst({
      where: { role: "student" },
      select: { title: true, description: true, date: true, id: true },
    });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw new Error("Failed to fetch announcements");
  } finally {
    await prisma.$disconnect(); // Disconnect from DB to free resources
  }

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <h1 className="card-title text-base-content p-3 text-3xl font-semibold">
        Announcements
      </h1>

      <div role="tablist" className="tabs tabs-border mt-3">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-base-content text-lg font-medium"
          aria-label="Common"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 text-base-content p-5"
        >
          <div className="flex flex-col space-y-5">
            {/* current Announcement box */}
            <div className="flex flex-col space-y-4 rounded-lg border-2 p-4">
              <h2 className="border-b pb-2 text-xl font-semibold">
                Present Announcement
              </h2>
              <h1 className="text-2xl font-semibold">
                {currentCommonAnnouncement?.title}
              </h1>
              <p className="text-base-content text-lg">
                {currentCommonAnnouncement?.description}
              </p>
              <div className="flex items-center space-x-3 border-t pt-2">
                <label className="text-base font-semibold text-slate-500">
                  Last Updated on:
                </label>
                <p className="text-base">
                  {currentCommonAnnouncement?.date
                    ? new Date(currentCommonAnnouncement.date).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
            {/* update box */}
            <form
              action={updateCommonAnnouncement}
              className="flex flex-col space-y-4 rounded-lg border-2 p-4"
            >
              <input
                type="text"
                name="id"
                value={currentCommonAnnouncement?.id}
                hidden
              />
              <h2 className="border-b pb-2 text-xl font-semibold">
                Update the Announcement
              </h2>
              <label className="mb-1 block text-lg font-medium text-gray-700">
                Title :
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                placeholder="Enter title"
              />
              <label className="mb-1 block text-lg font-medium text-gray-700">
                Description :
              </label>
              <textarea
                name="description"
                rows={5}
                className="textarea textarea-bordered w-full"
                placeholder="Enter description"
              ></textarea>
              <div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-base-content text-lg font-medium"
          aria-label="Student"
        />
        <div
          role="tabpanel"
          className="tab-content rounded-box border-base-300 bg-base-100 text-base-content p-5"
        >
          <div className="flex flex-col space-y-5">
            {/* current Announcement box */}
            <div className="flex flex-col space-y-4 rounded-lg border-2 p-4">
              <h2 className="border-b pb-2 text-xl font-semibold">
                Present Announcement
              </h2>
              <h1 className="text-2xl font-semibold">
                {currentStudentAnnouncement?.title}
              </h1>
              <p className="text-base-content text-lg">
                {currentStudentAnnouncement?.description}
              </p>
              <div className="flex items-center space-x-3 border-t pt-2">
                <label className="text-base font-semibold text-slate-500">
                  Last Updated on:
                </label>
                <p className="text-base">
                  {currentStudentAnnouncement?.date
                    ? new Date(currentStudentAnnouncement.date).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
            {/* update box */}
            <form
              action={updateStudentAnnouncement}
              className="flex flex-col space-y-4 rounded-lg border-2 p-4"
            >
              <input
                type="text"
                name="id"
                value={currentStudentAnnouncement?.id}
                hidden
              />
              <h2 className="border-b pb-2 text-xl font-semibold">
                Update the Announcement
              </h2>
              <label className="mb-1 block text-lg font-medium text-gray-700">
                Title :
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full"
                placeholder="Enter title"
              />
              <label className="mb-1 block text-lg font-medium text-gray-700">
                Description :
              </label>
              <textarea
                name="description"
                rows={5}
                className="textarea textarea-bordered w-full"
                placeholder="Enter description"
              ></textarea>
              <div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
