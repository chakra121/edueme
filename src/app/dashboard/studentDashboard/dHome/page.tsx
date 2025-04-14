"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function DHomePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/user/homeData");
        const json = await res.json();
        if ("error" in json) {
          setError(json.error ?? null);
        } else {
          setData(json);
        }
      } catch (err) {
        setError("Something went wrong while loading your dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-100 p-6 shadow-lg">
        <p className="text-center text-xl font-semibold text-error">{error}</p>
      </div>
    );
  }

  const { user, latestAnnouncement } = data;

  return (
    <div>
      {/* Welcome Banner */}
      <div className="card mb-4 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl text-base-content">
            Welcome {user.firstName} {user.lastName} 👋
          </h2>
          <p className="text-lg text-base-content">
            Ready to learn something new today?
          </p>
        </div>
      </div>

      {/* Progress & Announcement */}
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Course Progress */}
        <div className="card card-compact bg-base-100 p-6">
          <h1 className=" mb-3 text-2xl font-semibold text-base-content">
            Course Progress
          </h1>
          <div className="">
            {user.course ? (
                <div className="">
                  <p className="font-semibold text-lg mb-2">Course Name : {user.course.courseName}</p>
                  <p className="font-semibold text-lg mb-2">No. of Chapters : {user.course.chapterCount}</p>
                </div>
            ) : (
              <p className="text-center text-lg font-medium">
                You haven't purchased any course yet.
              </p>
            )}
          </div>
        </div>

        {/* Announcements */}
        <div className="card card-compact break-words bg-base-100 p-6">
          <h1 className="mb-2 text-2xl font-semibold text-base-content">
            Announcements
          </h1>
          <div className="space-y-2">
            {latestAnnouncement ? (
              <>
                <h4 className="break-words text-lg font-semibold">
                  {latestAnnouncement.title}
                </h4>
                <p className="whitespace-pre-line break-words text-base">
                  {latestAnnouncement.description}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No announcements at the moment.</p>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Classes */}
      <div className="card mb-4 bg-base-100">
        <div className="card-body">
          <h3 className="card-title text-2xl">Upcoming Classes</h3>
          {user.course ? (
            user.classLinkUpdatedAt ? (
              <p className="text-lg text-base-content">
                Your class link was last updated on{" "}
                <span className="font-semibold">
                  {format(new Date(user.classLinkUpdatedAt), "PPpp")}
                </span>
              </p>
            ) : (
              <p className="text-lg">
                It seems like a teacher has not been assigned to your class yet.
              </p>
            )
          ) : (
            <p className="text-lg">
              No class details available yet. Please check back later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
